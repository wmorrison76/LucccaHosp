/**
 * Communication System Types
 * Handles direct messaging, video conferencing, and notifications between chefs and BEO agents
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'chef' | 'sales_agent' | 'manager' | 'captain' | 'admin';
  department: 'kitchen' | 'sales' | 'management' | 'service';
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen?: string;
  phone?: string;
  title?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  messageType: 'text' | 'image' | 'file' | 'beo_reference' | 'system' | 'video_call_invite';
  timestamp: string;
  readAt?: string;
  editedAt?: string;
  
  // Message metadata
  metadata?: {
    beoId?: string;
    eventId?: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    fileUrl?: string;
    callDuration?: number;
    callStatus?: 'missed' | 'completed' | 'declined';
  };
  
  // Reactions and replies
  reactions?: MessageReaction[];
  replyToId?: string;
  isDeleted?: boolean;
  urgencyLevel?: 'low' | 'normal' | 'high' | 'urgent';
}

export interface MessageReaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  type: 'direct' | 'group' | 'beo_discussion';
  title?: string;
  description?: string;
  createdAt: string;
  lastMessageAt: string;
  lastMessage?: Message;
  
  // BEO-specific conversation metadata
  beoId?: string;
  eventId?: string;
  echoCrmEventId?: string;
  
  // Conversation settings
  isArchived: boolean;
  isMuted: boolean;
  notifications: boolean;
  pinnedMessages: string[]; // Message IDs
}

export interface VideoCall {
  id: string;
  conversationId: string;
  initiatorId: string;
  participantIds: string[];
  status: 'pending' | 'ringing' | 'active' | 'ended' | 'declined' | 'missed';
  startedAt?: string;
  endedAt?: string;
  duration?: number; // seconds
  
  // Call metadata
  callType: 'audio' | 'video' | 'screen_share';
  quality: 'audio' | 'sd' | 'hd' | 'fhd';
  roomId: string; // WebRTC room identifier
  
  // BEO context
  beoId?: string;
  eventId?: string;
  callReason?: string;
  
  // Recording (optional)
  isRecorded?: boolean;
  recordingUrl?: string;
  recordingDuration?: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'call' | 'beo_update' | 'system' | 'mention';
  title: string;
  content: string;
  timestamp: string;
  readAt?: string;
  actionUrl?: string;
  
  // Notification metadata
  metadata?: {
    senderId?: string;
    conversationId?: string;
    messageId?: string;
    callId?: string;
    beoId?: string;
    eventId?: string;
  };
  
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: 'communication' | 'workflow' | 'system' | 'alert';
}

export interface PresenceStatus {
  userId: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: string;
  currentActivity?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  location?: string; // Kitchen, Office, etc.
}

// Communication Store State
export interface CommunicationState {
  currentUser: User | null;
  conversations: Record<string, Conversation>;
  messages: Record<string, Message[]>; // conversationId -> Message[]
  users: Record<string, User>;
  notifications: Notification[];
  activeCall: VideoCall | null;
  presenceStatus: Record<string, PresenceStatus>;
  
  // UI State
  selectedConversationId: string | null;
  isCallModalOpen: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isChatPanelOpen: boolean;
  
  // Settings
  settings: {
    soundEnabled: boolean;
    desktopNotifications: boolean;
    emailNotifications: boolean;
    autoReadReceipts: boolean;
    showOnlineStatus: boolean;
    callQuality: 'auto' | 'audio' | 'sd' | 'hd';
  };
}

// API Types
export interface SendMessageRequest {
  recipientId: string;
  content: string;
  messageType?: Message['messageType'];
  beoId?: string;
  eventId?: string;
  urgencyLevel?: Message['urgencyLevel'];
  replyToId?: string;
}

export interface StartCallRequest {
  recipientIds: string[];
  callType: VideoCall['callType'];
  beoId?: string;
  eventId?: string;
  callReason?: string;
}

export interface ConversationFilter {
  type?: Conversation['type'];
  beoId?: string;
  participantId?: string;
  hasUnread?: boolean;
  isArchived?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

// WebSocket Events
export interface WebSocketEvent {
  type: 'message' | 'call' | 'presence' | 'typing' | 'reaction' | 'read_receipt';
  data: any;
  timestamp: string;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  isTyping: boolean;
  timestamp: string;
}

// BEO Integration Types
export interface BEOCommunicationContext {
  beoId: string;
  eventId?: string;
  echoCrmEventId?: string;
  createdBy: string; // Sales agent user ID
  assignedChef?: string;
  stakeholders: string[]; // All relevant user IDs
  conversationId?: string;
  
  // Quick communication templates
  templates: {
    id: string;
    title: string;
    content: string;
    category: 'clarification' | 'update' | 'approval' | 'urgent';
  }[];
}

// Video Conferencing Settings
export interface VideoSettings {
  defaultQuality: 'auto' | 'sd' | 'hd';
  preferredCodec: 'h264' | 'vp8' | 'vp9';
  echoCancellation: boolean;
  noiseSuppression: boolean;
  autoGainControl: boolean;
  
  // Screen sharing
  enableScreenShare: boolean;
  shareSystemAudio: boolean;
  
  // Recording
  enableRecording: boolean;
  recordingFormat: 'mp4' | 'webm';
  recordingQuality: 'sd' | 'hd';
}

// Integration with existing systems
export interface CommunicationIntegration {
  // Echo CRM Events integration
  echoCrmWebhookUrl?: string;
  echoCrmApiKey?: string;
  syncToEchoCrm: boolean;
  
  // Notification channels
  emailIntegration: {
    enabled: boolean;
    smtpConfig?: {
      host: string;
      port: number;
      username: string;
      password: string;
    };
  };
  
  smsIntegration: {
    enabled: boolean;
    provider?: 'twilio' | 'aws_sns';
    apiKey?: string;
    fromNumber?: string;
  };
  
  // Third-party video providers
  videoProvider: 'native' | 'twilio' | 'daily' | 'agora';
  videoConfig?: {
    apiKey: string;
    apiSecret?: string;
    roomDuration?: number; // minutes
    maxParticipants?: number;
  };
}

// Dashboard widget types
export interface CommunicationWidget {
  type: 'unread_messages' | 'active_calls' | 'online_users' | 'recent_activity';
  title: string;
  data: any;
  lastUpdated: string;
  refreshInterval?: number; // seconds
}

// Search and filtering
export interface MessageSearchResult {
  messageId: string;
  conversationId: string;
  content: string;
  timestamp: string;
  sender: User;
  highlight?: string;
  context?: {
    beforeMessage?: string;
    afterMessage?: string;
  };
}

export interface ConversationSearchFilter {
  query?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  messageType?: Message['messageType'];
  participantId?: string;
  beoId?: string;
  hasAttachments?: boolean;
  isUnread?: boolean;
}

// Analytics and reporting
export interface CommunicationAnalytics {
  totalMessages: number;
  totalCalls: number;
  averageResponseTime: number; // minutes
  mostActiveUsers: {
    userId: string;
    messageCount: number;
    callCount: number;
  }[];
  peakUsageHours: number[];
  beoDiscussionStats: {
    beoId: string;
    messageCount: number;
    participantCount: number;
    avgResolutionTime: number;
  }[];
}
