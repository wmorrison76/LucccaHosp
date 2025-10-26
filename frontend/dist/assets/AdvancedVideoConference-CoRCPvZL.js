import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { M as MicOff, V as VideoOff, a as Mic } from "./video-off-D4RbRVok.js";
import { V as Video } from "./Board-6RvNRUqx.js";
import { c as createLucideIcon, S as Settings } from "./settings-CL5KYzJi.js";
import { M as Monitor } from "./monitor-PiI9AQOi.js";
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2", key: "k0q8oc" }],
  ["path", { d: "M22 15V5a2 2 0 0 0-2-2H9", key: "cp1ac0" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const MonitorOff = createLucideIcon("monitor-off", __iconNode$1);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function AdvancedVideoConference({
  roomId = "default-room",
  participants = [],
  onParticipantJoin,
  onParticipantLeave
}) {
  const [videoStreams, setVideoStreams] = reactExports.useState([]);
  const [localStream, setLocalStream] = reactExports.useState(null);
  const [screenShareStream, setScreenShareStream] = reactExports.useState(null);
  const [selectedVideoDevice, setSelectedVideoDevice] = reactExports.useState("");
  const [selectedAudioDevice, setSelectedAudioDevice] = reactExports.useState("");
  const [availableDevices, setAvailableDevices] = reactExports.useState([]);
  const [videoLayout, setVideoLayout] = reactExports.useState("grid");
  const [pinnedParticipant, setPinnedParticipant] = reactExports.useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = reactExports.useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = reactExports.useState(true);
  const [isScreenSharing, setIsScreenSharing] = reactExports.useState(false);
  const [videoQuality, setVideoQuality] = reactExports.useState("720p");
  const [fullscreenParticipant, setFullscreenParticipant] = reactExports.useState(null);
  const localVideoRef = reactExports.useRef(null);
  const screenShareRef = reactExports.useRef(null);
  reactExports.useRef(/* @__PURE__ */ new Map());
  const getMediaDevices = reactExports.useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setAvailableDevices(devices);
      const videoDevices = devices.filter((device) => device.kind === "videoinput");
      const audioDevices = devices.filter((device) => device.kind === "audioinput");
      if (videoDevices.length > 0 && !selectedVideoDevice) {
        setSelectedVideoDevice(videoDevices[0].deviceId);
      }
      if (audioDevices.length > 0 && !selectedAudioDevice) {
        setSelectedAudioDevice(audioDevices[0].deviceId);
      }
    } catch (error) {
      console.error("Error getting media devices:", error);
    }
  }, [selectedVideoDevice, selectedAudioDevice]);
  const initializeLocalStream = reactExports.useCallback(async () => {
    try {
      const constraints = {
        video: isVideoEnabled ? {
          deviceId: selectedVideoDevice ? { exact: selectedVideoDevice } : void 0,
          width: { ideal: videoQuality === "1080p" ? 1920 : 1280 },
          height: { ideal: videoQuality === "1080p" ? 1080 : 720 },
          frameRate: { ideal: 30 }
        } : false,
        audio: isAudioEnabled ? {
          deviceId: selectedAudioDevice ? { exact: selectedAudioDevice } : void 0,
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
      console.error("Error initializing local stream:", error);
    }
  }, [isVideoEnabled, isAudioEnabled, selectedVideoDevice, selectedAudioDevice, videoQuality]);
  const startScreenShare = reactExports.useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: false
      });
      setScreenShareStream(stream);
      if (screenShareRef.current) {
        screenShareRef.current.srcObject = stream;
      }
      setIsScreenSharing(true);
      stream.getTracks().forEach((track) => {
        track.onended = () => {
          setScreenShareStream(null);
          setIsScreenSharing(false);
        };
      });
    } catch (error) {
      console.error("Error starting screen share:", error);
    }
  }, []);
  const stopScreenShare = reactExports.useCallback(() => {
    screenShareStream?.getTracks().forEach((track) => track.stop());
    setScreenShareStream(null);
    setIsScreenSharing(false);
  }, [screenShareStream]);
  const toggleVideo = reactExports.useCallback(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    setIsVideoEnabled(!isVideoEnabled);
  }, [localStream, isVideoEnabled]);
  const toggleAudio = reactExports.useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    setIsAudioEnabled(!isAudioEnabled);
  }, [localStream, isAudioEnabled]);
  reactExports.useEffect(() => {
    getMediaDevices();
    initializeLocalStream();
    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      screenShareStream?.getTracks().forEach((track) => track.stop());
    };
  }, [getMediaDevices, initializeLocalStream, localStream, screenShareStream]);
  reactExports.useEffect(() => {
    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      screenShareStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);
  const getLayoutStyle = () => {
    if (videoLayout === "speaker") {
      return { display: "grid", gridTemplateColumns: "1fr", gap: "8px" };
    }
    if (videoLayout === "sidebar") {
      return { display: "grid", gridTemplateColumns: "3fr 1fr", gap: "8px" };
    }
    return { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "8px" };
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#0f1c2e",
    color: "#e2e8f0",
    fontFamily: "system-ui, sans-serif"
  }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      padding: "12px 16px",
      backgroundColor: "rgba(10, 20, 35, 0.8)",
      borderBottom: "1px solid rgba(0, 217, 255, 0.2)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: { margin: "0 0 4px 0", fontSize: "16px", fontWeight: "bold" }, children: [
          "Video Conference: ",
          roomId
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 214,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: 0, fontSize: "12px", opacity: 0.7 }, children: [
          participants.length + 1,
          " participant(s)"
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 217,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
        lineNumber: 213,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", gap: "8px" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "select",
        {
          value: videoLayout,
          onChange: (e) => setVideoLayout(e.target.value),
          style: {
            padding: "6px 10px",
            backgroundColor: "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "4px",
            color: "#7ff3ff",
            fontSize: "12px",
            cursor: "pointer"
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "grid", children: "Grid" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 235,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "speaker", children: "Speaker" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 236,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "sidebar", children: "Sidebar" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 237,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 222,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
        lineNumber: 221,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
      lineNumber: 205,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      flex: 1,
      padding: "12px",
      overflowY: "auto",
      ...getLayoutStyle()
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
        position: "relative",
        backgroundColor: "#1a202c",
        borderRadius: "8px",
        overflow: "hidden",
        aspectRatio: "16 / 9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "180px",
        border: fullscreenParticipant === "local" ? "2px solid #7ff3ff" : "1px solid rgba(0, 217, 255, 0.2)"
      }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "video",
          {
            ref: localVideoRef,
            autoPlay: true,
            muted: true,
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "#000"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
            lineNumber: 262,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          position: "absolute",
          bottom: "8px",
          left: "8px",
          fontSize: "12px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "4px 8px",
          borderRadius: "4px"
        }, children: "You" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 273,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
        lineNumber: 250,
        columnNumber: 9
      }, this),
      participants.map((participant) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          style: {
            position: "relative",
            backgroundColor: "#1a202c",
            borderRadius: "8px",
            overflow: "hidden",
            aspectRatio: "16 / 9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "180px",
            border: fullscreenParticipant === participant.id ? "2px solid #7ff3ff" : "1px solid rgba(0, 217, 255, 0.2)",
            cursor: "pointer",
            transition: "all 0.2s ease"
          },
          onClick: () => setFullscreenParticipant(fullscreenParticipant === participant.id ? null : participant.id),
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#2d3748",
              fontSize: "48px"
            }, children: participant.avatar ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "img",
              {
                src: participant.avatar,
                alt: participant.name,
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
                lineNumber: 317,
                columnNumber: 17
              },
              this
            ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 217, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#7ff3ff",
              fontSize: "32px"
            }, children: participant.name.charAt(0).toUpperCase() }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 327,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 307,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
              position: "absolute",
              bottom: "8px",
              left: "8px",
              fontSize: "12px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "4px 8px",
              borderRadius: "4px"
            }, children: participant.name }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 342,
              columnNumber: 13
            }, this),
            participant.isMuted && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              MicOff,
              {
                size: 16,
                style: {
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  color: "#ef4444",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  padding: "4px",
                  borderRadius: "4px"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
                lineNumber: 354,
                columnNumber: 15
              },
              this
            )
          ]
        },
        participant.id,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 288,
          columnNumber: 11
        },
        this
      )),
      isScreenSharing && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
        position: "relative",
        backgroundColor: "#1a202c",
        borderRadius: "8px",
        overflow: "hidden",
        aspectRatio: "16 / 9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "180px",
        border: "1px solid rgba(34, 197, 94, 0.3)",
        gridColumn: "1 / -1"
      }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "video",
          {
            ref: screenShareRef,
            autoPlay: true,
            style: {
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "#000"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
            lineNumber: 385,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          position: "absolute",
          top: "8px",
          left: "8px",
          fontSize: "12px",
          backgroundColor: "rgba(34, 197, 94, 0.3)",
          padding: "4px 8px",
          borderRadius: "4px"
        }, children: "Screen Share" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 395,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
        lineNumber: 372,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
      lineNumber: 243,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      padding: "12px 16px",
      backgroundColor: "rgba(10, 20, 35, 0.8)",
      borderTop: "1px solid rgba(0, 217, 255, 0.2)",
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      flexWrap: "wrap"
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: toggleVideo,
          title: isVideoEnabled ? "Turn off video" : "Turn on video",
          style: {
            padding: "8px 16px",
            backgroundColor: isVideoEnabled ? "rgba(0, 217, 255, 0.2)" : "rgba(239, 68, 68, 0.2)",
            border: "1px solid " + (isVideoEnabled ? "rgba(0, 217, 255, 0.4)" : "rgba(239, 68, 68, 0.4)"),
            borderRadius: "6px",
            color: isVideoEnabled ? "#7ff3ff" : "#fca5a5",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            transition: "all 0.2s ease"
          },
          children: [
            isVideoEnabled ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Video, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 437,
              columnNumber: 29
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(VideoOff, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 437,
              columnNumber: 51
            }, this),
            isVideoEnabled ? "Video On" : "Video Off"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 420,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: toggleAudio,
          title: isAudioEnabled ? "Mute" : "Unmute",
          style: {
            padding: "8px 16px",
            backgroundColor: isAudioEnabled ? "rgba(0, 217, 255, 0.2)" : "rgba(239, 68, 68, 0.2)",
            border: "1px solid " + (isAudioEnabled ? "rgba(0, 217, 255, 0.4)" : "rgba(239, 68, 68, 0.4)"),
            borderRadius: "6px",
            color: isAudioEnabled ? "#7ff3ff" : "#fca5a5",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            transition: "all 0.2s ease"
          },
          children: [
            isAudioEnabled ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Mic, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 458,
              columnNumber: 29
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MicOff, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 458,
              columnNumber: 49
            }, this),
            isAudioEnabled ? "Muted Off" : "Muted"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 441,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: isScreenSharing ? stopScreenShare : startScreenShare,
          title: isScreenSharing ? "Stop screen share" : "Start screen share",
          style: {
            padding: "8px 16px",
            backgroundColor: isScreenSharing ? "rgba(34, 197, 94, 0.2)" : "rgba(0, 217, 255, 0.1)",
            border: "1px solid " + (isScreenSharing ? "rgba(34, 197, 94, 0.4)" : "rgba(0, 217, 255, 0.3)"),
            borderRadius: "6px",
            color: isScreenSharing ? "#86efac" : "#7ff3ff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            transition: "all 0.2s ease"
          },
          children: [
            isScreenSharing ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MonitorOff, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 479,
              columnNumber: 30
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Monitor, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 479,
              columnNumber: 57
            }, this),
            isScreenSharing ? "Stop Share" : "Share Screen"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 462,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          title: "Settings",
          style: {
            padding: "8px 12px",
            backgroundColor: "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: "6px",
            color: "#7ff3ff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            fontSize: "12px"
          },
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { size: 16 }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
            lineNumber: 497,
            columnNumber: 11
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 483,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          title: "End call",
          style: {
            padding: "8px 16px",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: "6px",
            color: "#fca5a5",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            transition: "all 0.2s ease",
            marginLeft: "auto"
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Phone, { size: 16 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
              lineNumber: 517,
              columnNumber: 11
            }, this),
            " End Call"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
          lineNumber: 500,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
      lineNumber: 411,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AdvancedVideoConference.tsx",
    lineNumber: 195,
    columnNumber: 5
  }, this);
}
export {
  AdvancedVideoConference as default
};
