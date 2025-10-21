// Sales Meeting Platform Types
// This file defines all types for the collaborative sales meeting platform

export interface MeetingParticipant {
  id: string;
  name: string;
  email: string;
  role: 'host' | 'sales_rep' | 'client' | 'support';
  department?: string;
  location?: string;
  avatar?: string;
  isOnline: boolean;
  hasVideo: boolean;
  hasAudio: boolean;
  isHandRaised: boolean;
  isPresenting: boolean;
  joinedAt: Date;
  permissions: {
    canDraw: boolean;
    canShare: boolean;
    canChat: boolean;
    canModerate: boolean;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  recipientId?: string; // undefined for group messages
  content: string;
  type: 'text' | 'file' | 'link' | 'drawing' | 'system';
  timestamp: Date;
  isPrivate: boolean;
  isInternal: boolean; // for organization-only messages
  attachments?: ChatAttachment[];
  mentions?: string[]; // participant IDs
  isEncrypted: boolean;
}

export interface ChatAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnail?: string;
}

export interface WhiteboardElement {
  id: string;
  type: 'draw' | 'text' | 'shape' | 'image' | 'link' | 'sticky_note' | 'highlight';
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string;
  style: {
    color: string;
    strokeWidth: number;
    fillColor?: string;
    fontSize?: number;
    fontFamily?: string;
  };
  path?: string; // SVG path for drawings
  createdBy: string;
  createdAt: Date;
  isLocked: boolean;
  layer: number;
}

export interface WhiteboardState {
  elements: WhiteboardElement[];
  viewBox: {
    x: number;
    y: number;
    width: number;
    height: number;
    zoom: number;
  };
  activeTool: WhiteboardTool;
  selectedElements: string[];
  collaborativeCursors: Map<string, { x: number; y: number; color: string }>;
}

export interface WhiteboardTool {
  type: 'select' | 'pen' | 'highlighter' | 'text' | 'shape' | 'eraser' | 'laser';
  subType?: 'rectangle' | 'circle' | 'line' | 'arrow';
  color: string;
  strokeWidth: number;
  opacity: number;
}

export interface ScreenShare {
  id: string;
  participantId: string;
  type: 'screen' | 'window' | 'tab' | 'application';
  isActive: boolean;
  startedAt: Date;
  resolution: {
    width: number;
    height: number;
  };
}

export interface MeetingSession {
  id: string;
  title: string;
  description?: string;
  hostId: string;
  participants: MeetingParticipant[];
  status: 'scheduled' | 'active' | 'paused' | 'ended';
  startTime: Date;
  endTime?: Date;
  scheduledDuration: number; // minutes
  meetingType: 'sales_call' | 'internal' | 'client_presentation' | 'training';
  securityLevel: 'standard' | 'high' | 'confidential';
  settings: {
    allowGuestAccess: boolean;
    requireApproval: boolean;
    recordMeeting: boolean;
    allowScreenShare: boolean;
    allowFileShare: boolean;
    enableWaitingRoom: boolean;
    maxParticipants: number;
  };
  whiteboard: WhiteboardState;
  chatHistory: ChatMessage[];
  recordings?: MeetingRecording[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingRecording {
  id: string;
  meetingId: string;
  type: 'video' | 'audio' | 'whiteboard' | 'chat';
  url: string;
  duration: number; // seconds
  size: number; // bytes
  startTime: Date;
  endTime: Date;
  isEncrypted: boolean;
  accessLevel: 'host_only' | 'participants' | 'organization';
}

export interface MeetingReminder {
  id: string;
  meetingId: string;
  participantId: string;
  type: 'email' | 'sms' | 'push' | 'in_app';
  scheduledFor: Date;
  sent: boolean;
  sentAt?: Date;
  content: {
    subject: string;
    message: string;
    includeJoinLink: boolean;
  };
}

export interface VideoConfig {
  resolution: '720p' | '1080p' | '4k';
  frameRate: 30 | 60;
  enableNoiseCancellation: boolean;
  enableBackgroundBlur: boolean;
  enableVirtualBackground: boolean;
  backgroundImage?: string;
}

export interface AudioConfig {
  enableNoiseSuppression: boolean;
  enableEchoCancellation: boolean;
  microphoneGain: number;
  speakerVolume: number;
  selectedMicrophone?: string;
  selectedSpeaker?: string;
}

export interface MeetingInvite {
  id: string;
  meetingId: string;
  inviteeEmail: string;
  inviteeName?: string;
  role: MeetingParticipant['role'];
  permissions: MeetingParticipant['permissions'];
  invitedBy: string;
  invitedAt: Date;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  joinLink: string;
  expiresAt: Date;
}

export interface OrganizationMember {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  location: string;
  timezone: string;
  avatar?: string;
  isOnline: boolean;
  availability: 'available' | 'busy' | 'away' | 'do_not_disturb';
}

// AI Integration types
export interface AIAssistant {
  id: string;
  name: string;
  type: 'sales_coach' | 'technical_support' | 'language_translator' | 'meeting_notes';
  isActive: boolean;
  capabilities: string[];
  lastInteraction?: Date;
}

export interface MeetingInsights {
  id: string;
  meetingId: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  engagementScore: number; // 0-1
  keyTopics: string[];
  actionItems: string[];
  followUpRequired: boolean;
  clientInterest: 'high' | 'medium' | 'low';
  recommendedNextSteps: string[];
  speakingTime: Record<string, number>; // participantId -> seconds
  generatedAt: Date;
}

// Third-party integration points
export interface CalendarIntegration {
  provider: 'google' | 'outlook' | 'apple';
  accountId: string;
  calendarId: string;
  syncEnabled: boolean;
  lastSync?: Date;
}

export interface CRMIntegration {
  provider: 'salesforce' | 'hubspot' | 'pipedrive';
  accountId: string;
  syncMeetingNotes: boolean;
  autoCreateLeads: boolean;
  lastSync?: Date;
}

// Default tools and configurations
export const defaultWhiteboardTools: WhiteboardTool[] = [
  { type: 'select', color: '#000000', strokeWidth: 2, opacity: 1 },
  { type: 'pen', color: '#000000', strokeWidth: 2, opacity: 1 },
  { type: 'highlighter', color: '#ffff00', strokeWidth: 8, opacity: 0.3 },
  { type: 'text', color: '#000000', strokeWidth: 1, opacity: 1 },
  { type: 'shape', subType: 'rectangle', color: '#000000', strokeWidth: 2, opacity: 1 },
  { type: 'shape', subType: 'circle', color: '#000000', strokeWidth: 2, opacity: 1 },
  { type: 'shape', subType: 'arrow', color: '#000000', strokeWidth: 2, opacity: 1 },
  { type: 'eraser', color: '#ffffff', strokeWidth: 10, opacity: 1 },
  { type: 'laser', color: '#ff0000', strokeWidth: 3, opacity: 0.8 }
];

export const meetingColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

// Security and encryption
export interface SecuritySettings {
  endToEndEncryption: boolean;
  waitingRoomEnabled: boolean;
  passwordRequired: boolean;
  allowRecording: boolean;
  allowScreenshots: boolean;
  watermarkEnabled: boolean;
  participantApprovalRequired: boolean;
  maxSessionDuration: number; // minutes
  idleTimeout: number; // minutes
}
