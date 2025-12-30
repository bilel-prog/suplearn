export interface Year {
  id?: number;
  name: string;
  yearNumber?: number;
  description?: string;
}

export interface Module {
  id?: number;
  name: string;
  description?: string;
  code?: string;
  yearId?: number;
}

export interface Subject {
  id?: number;
  name: string;
  description?: string;
  code?: string;
  moduleId?: number;
}
