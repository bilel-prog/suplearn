import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Year, Module, Subject } from '../models/academic.model';
import { STATIC_ACADEMIC_DATA } from '../models/academic-static-data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Years
  getAllYears(): Observable<Year[]> {
    return this.http.get<Year[]>(`${this.apiUrl}/years`)
      .pipe(catchError(() => of(STATIC_ACADEMIC_DATA as any)));
  }

  getYearById(id: number): Observable<Year> {
    return this.http.get<Year>(`${this.apiUrl}/years/${id}`)
      .pipe(catchError(() => {
        const year = STATIC_ACADEMIC_DATA.find(y => y.id === id);
        return of(year || STATIC_ACADEMIC_DATA[0]);
      }));
  }

  // Modules
  getAllModules(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/modules`)
      .pipe(catchError(() => {
        const modules: Module[] = [];
        STATIC_ACADEMIC_DATA.forEach(year => {
          if (year.modules) {
            modules.push(...year.modules);
          }
        });
        return of(modules);
      }));
  }

  getModulesByYear(yearId: number): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/modules/year/${yearId}`)
      .pipe(catchError(() => {
        const year = STATIC_ACADEMIC_DATA.find(y => y.id === yearId);
        return of(year?.modules || []);
      }));
  }

  getModuleById(id: number): Observable<Module> {
    return this.http.get<Module>(`${this.apiUrl}/modules/${id}`)
      .pipe(catchError(() => {
        let foundModule: Module | undefined;
        STATIC_ACADEMIC_DATA.forEach(year => {
          if (year.modules) {
            const mod = year.modules.find(m => m.id === id);
            if (mod) foundModule = mod;
          }
        });
        return of(foundModule || STATIC_ACADEMIC_DATA[0].modules![0]);
      }));
  }

  // Subjects
  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects`)
      .pipe(catchError(() => {
        const subjects: Subject[] = [];
        STATIC_ACADEMIC_DATA.forEach(year => {
          if (year.modules) {
            year.modules.forEach(module => {
              if (module.subjects) {
                subjects.push(...module.subjects);
              }
            });
          }
        });
        return of(subjects);
      }));
  }

  getSubjectsByModule(moduleId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects/module/${moduleId}`)
      .pipe(catchError(() => {
        let subjects: Subject[] = [];
        STATIC_ACADEMIC_DATA.forEach(year => {
          if (year.modules) {
            const module = year.modules.find(m => m.id === moduleId);
            if (module && module.subjects) {
              subjects = module.subjects;
            }
          }
        });
        return of(subjects);
      }));
  }

  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/subjects/${id}`)
      .pipe(catchError(() => {
        let foundSubject: Subject | undefined;
        STATIC_ACADEMIC_DATA.forEach(year => {
          if (year.modules) {
            year.modules.forEach(module => {
              if (module.subjects) {
                const subj = module.subjects.find(s => s.id === id);
                if (subj) foundSubject = subj;
              }
            });
          }
        });
        
        if (foundSubject) {
          return of(foundSubject);
        }
        
        // Return first available subject as fallback
        const firstSubject = STATIC_ACADEMIC_DATA[0].modules?.[0]?.subjects?.[0];
        return of(firstSubject || { id: 1, name: 'Unknown Subject' });
      }));
  }
}
