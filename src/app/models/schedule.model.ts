export interface Schedule {
  id?: number;
  userId: number;
  subjectId?: number;
  title: string;
  description?: string;
  scheduledDate: Date;
  durationMinutes?: number;
  isCompleted: boolean;
  googleCalendarEventId?: string;
  microsoftCalendarEventId?: string;
  reminderType?: ReminderType;
  createdAt?: Date;
}

export enum ReminderType {
  NONE = 'NONE',
  FIFTEEN_MINUTES = 'FIFTEEN_MINUTES',
  THIRTY_MINUTES = 'THIRTY_MINUTES',
  ONE_HOUR = 'ONE_HOUR',
  ONE_DAY = 'ONE_DAY'
}
