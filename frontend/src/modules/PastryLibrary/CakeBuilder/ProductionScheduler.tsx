/**
 * LUCCCA | Production Scheduler
 * Task timeline generation and staff assignment for cake production
 */

import React, { useState, useMemo } from 'react';
import { CakeDesign, ProductionTask, CakeIntakeData } from './types';

interface ProductionSchedulerProps {
  design: CakeDesign;
  onTasksGenerated?: (tasks: ProductionTask[]) => void;
  onClose?: () => void;
}

interface StaffMember {
  id: string;
  name: string;
  role: 'baker' | 'prep' | 'decorator';
}

/**
 * Generate production tasks from cake design specifications
 */
function generateProductionTasks(design: CakeDesign): ProductionTask[] {
  const { calculations, intakeData } = design;
  const layerCount = calculations.cakeLayers;
  const baseDate = new Date(intakeData.eventDate);
  const eventTime = intakeData.eventTime;

  // Parse event time
  const [eventHour, eventMinute] = eventTime.split(':').map(Number);
  const eventDateTime = new Date(baseDate);
  eventDateTime.setHours(eventHour, eventMinute, 0);

  // Calculate production start time (work backwards from event time)
  const totalProductionMinutes = calculations.totalProductionTimeMinutes;
  const productionStartTime = new Date(eventDateTime.getTime() - totalProductionMinutes * 60 * 1000);

  const tasks: ProductionTask[] = [];
  let currentTime = new Date(productionStartTime);

  // BAKING TASKS - one per layer
  for (let i = 0; i < layerCount; i++) {
    tasks.push({
      id: `bake-${i + 1}`,
      cakeDesignId: design.id,
      taskType: 'bake',
      assignedTo: undefined,
      startTime: currentTime.toISOString(),
      estimatedDurationMinutes: calculations.bakingTimeMinutes,
      status: 'pending',
      notes: `Bake layer ${i + 1}/${layerCount}. Temp: 350°F. Use cake thermometer to test doneness.`,
    });

    currentTime = new Date(currentTime.getTime() + calculations.bakingTimeMinutes * 60 * 1000);
  }

  // COOLING TASK
  tasks.push({
    id: 'cool',
    cakeDesignId: design.id,
    taskType: 'cool',
    assignedTo: undefined,
    startTime: currentTime.toISOString(),
    estimatedDurationMinutes: calculations.coolingTimeMinutes,
    status: 'pending',
    notes: `Cool all layers to room temperature. Allow complete cooling before handling.`,
  });

  currentTime = new Date(currentTime.getTime() + calculations.coolingTimeMinutes * 60 * 1000);

  // LEVELING TASK
  tasks.push({
    id: 'level',
    cakeDesignId: design.id,
    taskType: 'level',
    assignedTo: undefined,
    startTime: currentTime.toISOString(),
    estimatedDurationMinutes: 15,
    status: 'pending',
    notes: `Level cake layers using cake leveler. Remove domes for even stacking.`,
  });

  currentTime = new Date(currentTime.getTime() + 15 * 60 * 1000);

  // FILLING TASK
  tasks.push({
    id: 'fill',
    cakeDesignId: design.id,
    taskType: 'fill',
    assignedTo: undefined,
    startTime: currentTime.toISOString(),
    estimatedDurationMinutes: 20,
    status: 'pending',
    notes: `Apply fillings between layers: ${intakeData.fillingFlavors.join(', ')}. Use offset spatula for even distribution.`,
  });

  currentTime = new Date(currentTime.getTime() + 20 * 60 * 1000);

  // CRUMB COAT TASK
  tasks.push({
    id: 'crumb_coat',
    cakeDesignId: design.id,
    taskType: 'crumb_coat',
    assignedTo: undefined,
    startTime: currentTime.toISOString(),
    estimatedDurationMinutes: 15,
    status: 'pending',
    notes: `Apply thin crumb coat of icing. Chill for 30 minutes to seal crumbs before final frosting.`,
  });

  currentTime = new Date(currentTime.getTime() + 15 * 60 * 1000);

  // REFRIGERATION (part of crumb coat process)
  currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000);

  // FROSTING TASK
  tasks.push({
    id: 'frost',
    cakeDesignId: design.id,
    taskType: 'frost',
    assignedTo: undefined,
    startTime: currentTime.toISOString(),
    estimatedDurationMinutes: 30,
    status: 'pending',
    notes: `Apply final icing coat using ${intakeData.icingType}. Color: ${intakeData.icingColor}. Use piping bag for borders if desired.`,
  });

  currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000);

  // DECORATION TASK
  if (intakeData.decorationNotes.length > 0) {
    tasks.push({
      id: 'decorate',
      cakeDesignId: design.id,
      taskType: 'decorate',
      assignedTo: undefined,
      startTime: currentTime.toISOString(),
      estimatedDurationMinutes: 45,
      status: 'pending',
      notes: `Apply decorations: ${intakeData.decorationNotes}. Theme: ${intakeData.theme}. Allow time for fondant work or additional embellishments.`,
    });
  }

  return tasks;
}

/**
 * Main Production Scheduler Component
 */
export const ProductionScheduler: React.FC<ProductionSchedulerProps> = ({ design, onTasksGenerated, onClose }) => {
  const tasks = useMemo(() => generateProductionTasks(design), [design]);
  const [taskList, setTaskList] = useState<ProductionTask[]>(tasks);
  const [selectedStaff, setSelectedStaff] = useState<Record<string, string>>({}); // taskId -> staffName
  const [staffMembers] = useState<StaffMember[]>([
    { id: 'baker1', name: 'Baker 1', role: 'baker' },
    { id: 'baker2', name: 'Baker 2', role: 'baker' },
    { id: 'prep1', name: 'Prep Person 1', role: 'prep' },
    { id: 'prep2', name: 'Prep Person 2', role: 'prep' },
    { id: 'decorator1', name: 'Decorator 1', role: 'decorator' },
  ]);

  const handleTaskStatusChange = (taskId: string, status: ProductionTask['status']) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
              completedTime: status === 'completed' ? new Date().toISOString() : undefined,
            }
          : task
      )
    );
  };

  const handleAssignStaff = (taskId: string, staffName: string) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, assignedTo: staffName || undefined }
          : task
      )
    );
    setSelectedStaff((prev) => ({
      ...prev,
      [taskId]: staffName,
    }));
  };

  const getTaskColor = (taskType: ProductionTask['taskType']): string => {
    const colors: Record<string, string> = {
      bake: '#FF6B6B',
      cool: '#4ECDC4',
      level: '#95E1D3',
      fill: '#F38181',
      crumb_coat: '#AA96DA',
      frost: '#FCBAD3',
      decorate: '#FFD93D',
    };
    return colors[taskType] || '#999';
  };

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const taskTypeLabels: Record<ProductionTask['taskType'], string> = {
    bake: '🔥 Bake',
    cool: '❄️ Cool',
    level: '📐 Level',
    fill: '🍓 Fill',
    crumb_coat: '🧈 Crumb Coat',
    frost: '🎨 Frost',
    decorate: '✨ Decorate',
  };

  const completedTasks = taskList.filter((t) => t.status === 'completed').length;
  const completionPercentage = Math.round((completedTasks / taskList.length) * 100);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📋 Production Scheduler</h1>
        <p style={styles.subtitle}>
          {design.name} | {design.intakeData.guestCount} guests | {design.intakeData.eventDate}
        </p>

        {/* Progress Bar */}
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${completionPercentage}%`,
            }}
          />
        </div>
        <p style={styles.progressText}>
          {completedTasks} of {taskList.length} tasks completed ({completionPercentage}%)
        </p>
      </div>

      {/* Timeline */}
      <div style={styles.timelineContainer}>
        {taskList.map((task, index) => {
          const startDate = formatDate(task.startTime);
          const startTime = formatTime(task.startTime);
          const endTime = formatTime(
            new Date(new Date(task.startTime).getTime() + task.estimatedDurationMinutes * 60 * 1000).toISOString()
          );

          return (
            <div key={task.id} style={styles.timelineItem}>
              {/* Timeline dot and connector */}
              <div style={styles.timeline}>
                <div
                  style={{
                    ...styles.timelineDot,
                    backgroundColor:
                      task.status === 'completed'
                        ? '#22C55E'
                        : task.status === 'in_progress'
                          ? getTaskColor(task.taskType)
                          : '#DDD',
                  }}
                />
                {index < taskList.length - 1 && <div style={styles.timelineConnector} />}
              </div>

              {/* Task Card */}
              <div
                style={{
                  ...styles.taskCard,
                  borderLeftColor: getTaskColor(task.taskType),
                }}
              >
                {/* Task Header */}
                <div style={styles.taskHeader}>
                  <div>
                    <span
                      style={{
                        ...styles.taskTypeLabel,
                        backgroundColor: getTaskColor(task.taskType),
                      }}
                    >
                      {taskTypeLabels[task.taskType]}
                    </span>
                    <span style={styles.taskDuration}>{task.estimatedDurationMinutes} min</span>
                  </div>

                  {/* Status Button */}
                  <select
                    value={task.status}
                    onChange={(e) => handleTaskStatusChange(task.id, e.target.value as ProductionTask['status'])}
                    style={{
                      ...styles.statusSelect,
                      backgroundColor:
                        task.status === 'completed'
                          ? '#D1FAE5'
                          : task.status === 'in_progress'
                            ? '#FEF3C7'
                            : '#F3F4F6',
                    }}
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="in_progress">▶️ In Progress</option>
                    <option value="completed">✅ Completed</option>
                    <option value="paused">⏸️ Paused</option>
                  </select>
                </div>

                {/* Time and Date */}
                <p style={styles.taskTime}>
                  📅 {startDate} | ⏰ {startTime} - {endTime}
                </p>

                {/* Task Notes */}
                <p style={styles.taskNotes}>{task.notes}</p>

                {/* Staff Assignment */}
                <div style={styles.assignmentSection}>
                  <label style={styles.assignLabel}>Assign to: </label>
                  <select
                    value={selectedStaff[task.id] || ''}
                    onChange={(e) => handleAssignStaff(task.id, e.target.value)}
                    style={styles.staffSelect}
                  >
                    <option value="">— Unassigned —</option>
                    {staffMembers.map((staff) => (
                      <option key={staff.id} value={staff.name}>
                        {staff.name} ({staff.role})
                      </option>
                    ))}
                  </select>
                  {task.assignedTo && <span style={styles.assignedTo}>👤 {task.assignedTo}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div style={styles.summarySection}>
        <h3 style={styles.summaryTitle}>📊 Production Summary</h3>
        <div style={styles.summaryGrid}>
          <div style={styles.summaryItem}>
            <strong>Total Tasks:</strong> {taskList.length}
          </div>
          <div style={styles.summaryItem}>
            <strong>Total Duration:</strong>{' '}
            {Math.floor(design.calculations.totalProductionTimeMinutes / 60)}h{' '}
            {design.calculations.totalProductionTimeMinutes % 60}m
          </div>
          <div style={styles.summaryItem}>
            <strong>Production Start:</strong> {formatDate(taskList[0].startTime)}{' '}
            {formatTime(taskList[0].startTime)}
          </div>
          <div style={styles.summaryItem}>
            <strong>Event Date:</strong> {design.intakeData.eventDate}{' '}
            {design.intakeData.eventTime}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button
          onClick={() => {
            onTasksGenerated?.(taskList);
          }}
          style={styles.buttonPrimary}
        >
          💾 Save Tasks
        </button>
        {onClose && (
          <button onClick={onClose} style={styles.buttonSecondary}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    overflow: 'auto',
    backgroundColor: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderBottom: '2px solid #ddd',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.8rem',
    color: '#000',
  },
  subtitle: {
    margin: '0 0 1rem 0',
    fontSize: '0.95rem',
    color: '#666',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    transition: 'width 0.3s ease',
  },
  progressText: {
    margin: '0',
    fontSize: '0.85rem',
    color: '#666',
  },
  timelineContainer: {
    flex: 1,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  timelineItem: {
    display: 'flex',
    gap: '1rem',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40px',
  },
  timelineDot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '3px solid #fff',
    backgroundColor: '#ddd',
  },
  timelineConnector: {
    width: '2px',
    height: '80px',
    backgroundColor: '#ddd',
    marginTop: '0.5rem',
  },
  taskCard: {
    flex: 1,
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    borderLeft: '4px solid #999',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  taskTypeLabel: {
    display: 'inline-block',
    padding: '0.4rem 0.8rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#fff',
    borderRadius: '4px',
    marginRight: '0.5rem',
  },
  taskDuration: {
    fontSize: '0.85rem',
    color: '#666',
    fontWeight: '500',
  },
  statusSelect: {
    padding: '0.5rem',
    fontSize: '0.85rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  taskTime: {
    margin: '0.5rem 0',
    fontSize: '0.9rem',
    color: '#666',
  },
  taskNotes: {
    margin: '0.75rem 0',
    fontSize: '0.9rem',
    color: '#333',
    lineHeight: '1.4',
  },
  assignmentSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #eee',
  },
  assignLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#333',
  },
  staffSelect: {
    padding: '0.4rem 0.6rem',
    fontSize: '0.85rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  assignedTo: {
    marginLeft: '1rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#0066cc',
  },
  summarySection: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderTop: '2px solid #ddd',
  },
  summaryTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#000',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  summaryItem: {
    padding: '0.75rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderTop: '2px solid #ddd',
  },
  buttonPrimary: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#0066cc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonSecondary: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0066cc',
    backgroundColor: '#fff',
    border: '2px solid #0066cc',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
