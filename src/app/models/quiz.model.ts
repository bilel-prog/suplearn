export interface Quiz {
  id?: number;
  title: string;
  description: string;
  googleFormUrl: string;
  subjectId: number;
  createdById: number;
  createdAt?: Date;
  isActive: boolean;
  durationMinutes?: number;
  passingScore?: number;
}

export interface QuizAttempt {
  id?: number;
  quizId: number;
  userId: number;
  score: number;
  maxScore: number;
  attemptedAt?: Date;
  timeSpentMinutes?: number;
  isPassed: boolean;
}
