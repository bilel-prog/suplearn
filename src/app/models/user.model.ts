export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: 'STUDENT' | 'PROFESSOR' | 'ADMIN';
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
