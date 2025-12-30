export interface Progress {
  id?: number;
  userId: number;
  resourceId?: number;
  subjectId?: number;
  activityType: ActivityType;
  timeSpentMinutes?: number;
  activityDate?: Date;
  notes?: string;
}

export enum ActivityType {
  VIEW = 'VIEW',
  DOWNLOAD = 'DOWNLOAD',
  QUIZ_ATTEMPT = 'QUIZ_ATTEMPT',
  STUDY_SESSION = 'STUDY_SESSION'
}

export interface ProgressStatistics {
  totalStudyTimeMinutes: number;
  resourcesViewed: number;
  resourcesDownloaded: number;
}
