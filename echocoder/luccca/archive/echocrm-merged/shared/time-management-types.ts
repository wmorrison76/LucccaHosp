export interface TimeEntry {
  id: string;
  userId: string;
  taskId?: string;
  projectId?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  description: string;
  category: TimeCategory;
  tags: string[];
  billable: boolean;
  status: 'active' | 'paused' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeCategory {
  id: string;
  name: string;
  color: string;
  description?: string;
  isActive: boolean;
}

export interface ProductivityMetrics {
  userId: string;
  date: Date;
  totalHours: number;
  billableHours: number;
  tasksCompleted: number;
  averageTaskDuration: number;
  focusScore: number; // 0-100 based on time spent on tasks vs breaks
  activityBreakdown: CategoryTime[];
  peakHours: string[]; // hours of day when most productive
}

export interface CategoryTime {
  categoryId: string;
  categoryName: string;
  timeSpent: number; // in minutes
  percentage: number;
  color: string;
}

export interface TeamProductivity {
  teamId: string;
  date: Date;
  totalTeamHours: number;
  averageHoursPerMember: number;
  totalTasksCompleted: number;
  teamFocusScore: number;
  topPerformers: UserMetric[];
  categoryBreakdown: CategoryTime[];
  departmentBreakdown: DepartmentMetric[];
}

export interface UserMetric {
  userId: string;
  userName: string;
  avatar?: string;
  hoursWorked: number;
  tasksCompleted: number;
  focusScore: number;
  efficiency: number; // tasks completed per hour
}

export interface DepartmentMetric {
  departmentId: string;
  departmentName: string;
  totalHours: number;
  memberCount: number;
  averageHours: number;
  topCategories: CategoryTime[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  timestamp: Date;
  action: ActivityAction;
  module: SystemModule;
  details: Record<string, any>;
  duration?: number; // time spent on this action
}

export type ActivityAction = 
  | 'login'
  | 'logout'
  | 'create'
  | 'edit'
  | 'delete'
  | 'view'
  | 'export'
  | 'import'
  | 'search'
  | 'navigate'
  | 'idle'
  | 'focus'
  | 'break';

export type SystemModule = 
  | 'sales-pipeline'
  | 'beo-management'
  | 'events'
  | 'contacts'
  | 'calendar'
  | 'analytics'
  | 'admin'
  | 'settings'
  | 'gantt'
  | 'time-management';

export interface TimeTarget {
  id: string;
  userId: string;
  type: 'daily' | 'weekly' | 'monthly';
  targetHours: number;
  category?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Break {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  type: 'short' | 'lunch' | 'meeting' | 'other';
  description?: string;
}

export interface FocusSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  targetDuration: number; // in minutes
  actualDuration?: number;
  category: string;
  description: string;
  interruptions: number;
  completed: boolean;
}

export interface ProductivitySettings {
  userId: string;
  autoTrackIdle: boolean;
  idleTimeThreshold: number; // minutes before considered idle
  reminderInterval: number; // minutes between tracking reminders
  trackBreaks: boolean;
  focusSessionDuration: number; // default focus session length
  dailyHourTarget: number;
  weeklyHourTarget: number;
  categories: TimeCategory[];
}

export interface TimeReport {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  startDate: Date;
  endDate: Date;
  userId?: string; // if null, it's a team report
  teamId?: string;
  generatedAt: Date;
  data: {
    summary: {
      totalHours: number;
      billableHours: number;
      tasksCompleted: number;
      averageDaily: number;
    };
    trends: {
      hoursComparison: number; // % change from previous period
      tasksComparison: number;
      focusComparison: number;
    };
    breakdown: CategoryTime[];
    dailyData: DailyTimeData[];
  };
}

export interface DailyTimeData {
  date: Date;
  hours: number;
  tasks: number;
  focusScore: number;
  topCategory: string;
}

// Default categories for time tracking
export const defaultTimeCategories: TimeCategory[] = [
  {
    id: 'sales',
    name: 'Sales Activities',
    color: '#10B981',
    description: 'Sales calls, lead qualification, pipeline management',
    isActive: true
  },
  {
    id: 'events',
    name: 'Event Planning',
    color: '#8B5CF6',
    description: 'Event coordination, BEO creation, venue setup',
    isActive: true
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    color: '#F59E0B',
    description: 'Customer support, issue resolution, follow-ups',
    isActive: true
  },
  {
    id: 'admin',
    name: 'Administrative',
    color: '#6B7280',
    description: 'Documentation, reporting, system maintenance',
    isActive: true
  },
  {
    id: 'meetings',
    name: 'Meetings',
    color: '#EF4444',
    description: 'Team meetings, client meetings, briefings',
    isActive: true
  },
  {
    id: 'training',
    name: 'Training',
    color: '#3B82F6',
    description: 'Skill development, system training, workshops',
    isActive: true
  }
];
