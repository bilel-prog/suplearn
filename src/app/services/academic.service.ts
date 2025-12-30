import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Year, Module, Subject } from '../models/academic.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Years
  getAllYears(): Observable<Year[]> {
    return this.http.get<Year[]>(`${this.apiUrl}/years`);
  }

  getYearById(id: number): Observable<Year> {
    return this.http.get<Year>(`${this.apiUrl}/years/${id}`);
  }

  // Modules
  getAllModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/modules`);
  }

  getModulesByYear(yearId: number): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/modules/year/${yearId}`);
  }

  getModuleById(id: number): Observable<Module> {
    return this.http.get<Module>(`${this.apiUrl}/modules/${id}`);
  }

  // Subjects
  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects`);
  }

  getSubjectsByModule(moduleId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects/module/${moduleId}`);
  }

  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/subjects/${id}`);
  }
}
