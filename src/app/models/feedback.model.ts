export interface Rating {
  id?: number;
  resourceId: number;
  userId: number;
  rating: number; // 1-5
  review?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comment {
  id?: number;
  resourceId: number;
  userId: number;
  content: string;
  parentCommentId?: number;
  isApproved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  user?: {
    username: string;
    firstName: string;
    lastName: string;
  };
  replies?: Comment[];
}
