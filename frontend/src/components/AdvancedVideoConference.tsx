import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  Phone,
  Settings,
  Maximize2,
  Minimize2,
  Pin,
  PinOff,
  MoreVertical
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isMuted?: boolean;
  isVideoOff?: boolean;
}

interface AdvancedVideoConferenceProps {
  roomId?: string;
  participants?: Participant[];
  onParticipantJoin?: (participant: Participant) => void;
  onParticipantLeave?: (participantId: string) => void;
}

interface VideoStream {
  participantId: string;
  stream: MediaStream;
  isScreenShare?: boolean;
  isMuted?: boolean;
}

export default function AdvancedVideoConference({
  roomId = "default-room",
  participants = [],
  onParticipantJoin,
  onParticipantLeave
}: AdvancedVideoConferenceProps) {
  const [videoStreams, setVideoStreams] = useState<VideoStream[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenShareStream, setScreenShareStream] = useState<MediaStream | null>(null);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>('');
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>('');
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoLayout, setVideoLayout] = useState<'grid' | 'speaker' | 'sidebar'>('grid');
  const [pinnedParticipant, setPinnedParticipant] = useState<string | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [videoQuality, setVideoQuality] = useState<'720p' | '1080p'>('720p');
  const [fullscreenParticipant, setFullscreenParticipant] = useState<string | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Get available media devices
  const getMediaDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setAvailableDevices(devices);

      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      const audioDevices = devices.filter(device => device.kind === 'audioinput');

      if (videoDevices.length > 0 && !selectedVideoDevice) {
        setSelectedVideoDevice(videoDevices[0].deviceId);
      }
      if (audioDevices.length > 0 && !selectedAudioDevice) {
        setSelectedAudioDevice(audioDevices[0].deviceId);
      }
    } catch (error) {
      console.error('Error getting media devices:', error);
    }
  }, [selectedVideoDevice, selectedAudioDevice]);

  // Initialize local media stream
  const initializeLocalStream = useCallback(async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: isVideoEnabled ? {
          deviceId: selectedVideoDevice ? { exact: selectedVideoDevice } : undefined,
          width: { ideal: videoQuality === '1080p' ? 1920 : 1280 },
          height: { ideal: videoQuality === '1080p' ? 1080 : 720 },
          frameRate: { ideal: 30 }
        } : false,
        audio: isAudioEnabled ? {
          deviceId: selectedAudioDevice ? { exact: selectedAudioDevice } : undefined,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } : false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);

      if (localVideoRef.current && isVideoEnabled) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error initializing local stream:', error);
    }
  }, [isVideoEnabled, isAudioEnabled, selectedVideoDevice, selectedAudioDevice, videoQuality]);

  // Start screen sharing
  const startScreenShare = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: false
      });

      setScreenShareStream(stream);
      if (screenShareRef.current) {
        screenShareRef.current.srcObject = stream;
      }
      setIsScreenSharing(true);

      stream.getTracks().forEach(track => {
        track.onended = () => {
          setScreenShareStream(null);
          setIsScreenSharing(false);
        };
      });
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  }, []);

  // Stop screen sharing
  const stopScreenShare = useCallback(() => {
    screenShareStream?.getTracks().forEach(track => track.stop());
    setScreenShareStream(null);
    setIsScreenSharing(false);
  }, [screenShareStream]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setIsVideoEnabled(!isVideoEnabled);
  }, [localStream, isVideoEnabled]);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setIsAudioEnabled(!isAudioEnabled);
  }, [localStream, isAudioEnabled]);

  // Initialize on mount
  useEffect(() => {
    getMediaDevices();
    initializeLocalStream();

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      screenShareStream?.getTracks().forEach(track => track.stop());
    };
  }, [getMediaDevices, initializeLocalStream, localStream, screenShareStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      screenShareStream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const getLayoutStyle = () => {
    if (videoLayout === 'speaker') {
      return { display: 'grid', gridTemplateColumns: '1fr', gap: '8px' };
    }
    if (videoLayout === 'sidebar') {
      return { display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '8px' };
    }
    return { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' };
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#0f1c2e',
      color: '#e2e8f0',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: 'rgba(10, 20, 35, 0.8)',
        borderBottom: '1px solid rgba(0, 217, 255, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>
            Video Conference: {roomId}
          </h2>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>
            {participants.length + 1} participant(s)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={videoLayout}
            onChange={(e) => setVideoLayout(e.target.value as 'grid' | 'speaker' | 'sidebar')}
            style={{
              padding: '6px 10px',
              backgroundColor: 'rgba(0, 217, 255, 0.1)',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              borderRadius: '4px',
              color: '#7ff3ff',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            <option value="grid">Grid</option>
            <option value="speaker">Speaker</option>
            <option value="sidebar">Sidebar</option>
          </select>
        </div>
      </div>

      {/* Video Grid */}
      <div style={{
        flex: 1,
        padding: '12px',
        overflowY: 'auto',
        ...getLayoutStyle()
      }}>
        {/* Local Video */}
        <div style={{
          position: 'relative',
          backgroundColor: '#1a202c',
          borderRadius: '8px',
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '180px',
          border: fullscreenParticipant === 'local' ? '2px solid #7ff3ff' : '1px solid rgba(0, 217, 255, 0.2)'
        }}>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              backgroundColor: '#000'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            fontSize: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            You
          </div>
        </div>

        {/* Remote Participants */}
        {participants.map((participant) => (
          <div
            key={participant.id}
            style={{
              position: 'relative',
              backgroundColor: '#1a202c',
              borderRadius: '8px',
              overflow: 'hidden',
              aspectRatio: '16 / 9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '180px',
              border: fullscreenParticipant === participant.id ? '2px solid #7ff3ff' : '1px solid rgba(0, 217, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setFullscreenParticipant(fullscreenParticipant === participant.id ? null : participant.id)}
          >
            {/* Placeholder for participant video or avatar */}
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2d3748',
              fontSize: '48px'
            }}>
              {participant.avatar ? (
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 217, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7ff3ff',
                  fontSize: '32px'
                }}>
                  {participant.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              fontSize: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>
              {participant.name}
            </div>
            {participant.isMuted && (
              <MicOff
                size={16}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  color: '#ef4444',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  padding: '4px',
                  borderRadius: '4px'
                }}
              />
            )}
          </div>
        ))}

        {/* Screen Share */}
        {isScreenSharing && (
          <div style={{
            position: 'relative',
            backgroundColor: '#1a202c',
            borderRadius: '8px',
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '180px',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            gridColumn: '1 / -1'
          }}>
            <video
              ref={screenShareRef}
              autoPlay
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: '#000'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              fontSize: '12px',
              backgroundColor: 'rgba(34, 197, 94, 0.3)',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>
              Screen Share
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: 'rgba(10, 20, 35, 0.8)',
        borderTop: '1px solid rgba(0, 217, 255, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={toggleVideo}
          title={isVideoEnabled ? 'Turn off video' : 'Turn on video'}
          style={{
            padding: '8px 16px',
            backgroundColor: isVideoEnabled ? 'rgba(0, 217, 255, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            border: '1px solid ' + (isVideoEnabled ? 'rgba(0, 217, 255, 0.4)' : 'rgba(239, 68, 68, 0.4)'),
            borderRadius: '6px',
            color: isVideoEnabled ? '#7ff3ff' : '#fca5a5',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            transition: 'all 0.2s ease'
          }}
        >
          {isVideoEnabled ? <Video size={16} /> : <VideoOff size={16} />}
          {isVideoEnabled ? 'Video On' : 'Video Off'}
        </button>

        <button
          onClick={toggleAudio}
          title={isAudioEnabled ? 'Mute' : 'Unmute'}
          style={{
            padding: '8px 16px',
            backgroundColor: isAudioEnabled ? 'rgba(0, 217, 255, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            border: '1px solid ' + (isAudioEnabled ? 'rgba(0, 217, 255, 0.4)' : 'rgba(239, 68, 68, 0.4)'),
            borderRadius: '6px',
            color: isAudioEnabled ? '#7ff3ff' : '#fca5a5',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            transition: 'all 0.2s ease'
          }}
        >
          {isAudioEnabled ? <Mic size={16} /> : <MicOff size={16} />}
          {isAudioEnabled ? 'Muted Off' : 'Muted'}
        </button>

        <button
          onClick={isScreenSharing ? stopScreenShare : startScreenShare}
          title={isScreenSharing ? 'Stop screen share' : 'Start screen share'}
          style={{
            padding: '8px 16px',
            backgroundColor: isScreenSharing ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0, 217, 255, 0.1)',
            border: '1px solid ' + (isScreenSharing ? 'rgba(34, 197, 94, 0.4)' : 'rgba(0, 217, 255, 0.3)'),
            borderRadius: '6px',
            color: isScreenSharing ? '#86efac' : '#7ff3ff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            transition: 'all 0.2s ease'
          }}
        >
          {isScreenSharing ? <MonitorOff size={16} /> : <Monitor size={16} />}
          {isScreenSharing ? 'Stop Share' : 'Share Screen'}
        </button>

        <button
          title="Settings"
          style={{
            padding: '8px 12px',
            backgroundColor: 'rgba(0, 217, 255, 0.1)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            borderRadius: '6px',
            color: '#7ff3ff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px'
          }}
        >
          <Settings size={16} />
        </button>

        <button
          title="End call"
          style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '6px',
            color: '#fca5a5',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            transition: 'all 0.2s ease',
            marginLeft: 'auto'
          }}
        >
          <Phone size={16} /> End Call
        </button>
      </div>
    </div>
  );
}
