export interface Resource {
  id?: number;
  title: string;
  description: string;
  fileName: string;
  filePath?: string;
  fileType?: string;
  fileSize?: number;
  type: ResourceType;
  status: ApprovalStatus;
  subjectId: number;
  uploadedBy?: User;
  approvedBy?: User;
  uploadDate?: Date;
  approvalDate?: Date;
  viewCount?: number;
  downloadCount?: number;
  averageRating?: number;
  ratingCount?: number;
}

export enum ResourceType {
  COURSE = 'COURSE',
  EXAM = 'EXAM',
  PROJECT = 'PROJECT',
  COURSEWORK = 'COURSEWORK'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

import { User } from './user.model';
