import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Progress, ProgressStatistics, ActivityType } from '../models/progress.model';
import { environment } from '../../environments/environment';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private apiUrl = `${environment.apiUrl}/progress`;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) {}

  trackProgress(progress: Progress): Observable<Progress> {
    return this.http.post<Progress>(`${this.apiUrl}/track`, progress)
      .pipe(catchError(() => of({ ...progress, id: Math.floor(Math.random() * 10000) })));
  }

  getUserProgress(): Observable<Progress[]> {
    return this.http.get<Progress[]>(`${this.apiUrl}/user`)
      .pipe(catchError(() => of(this.mockDataService.getMockProgress())));
  }

  getUserProgressInDateRange(startDate: Date, endDate: Date): Observable<Progress[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<Progress[]>(`${this.apiUrl}/user/daterange`, { params })
      .pipe(catchError(() => {
        const allProgress = this.mockDataService.getMockProgress();
        return of(allProgress.filter(p => {
          const date = p.activityDate ? new Date(p.activityDate) : new Date();
          return date >= startDate && date <= endDate;
        }));
      }));
  }

  getUserStatistics(): Observable<ProgressStatistics> {
    return this.http.get<ProgressStatistics>(`${this.apiUrl}/user/statistics`)
      .pipe(catchError(() => {
        const progress = this.mockDataService.getMockProgress();
        const totalTimeMinutes = progress.reduce((sum, p) => sum + (p.timeSpentMinutes || 0), 0);
        return of({
          totalStudyTimeMinutes: totalTimeMinutes,
          resourcesViewed: progress.filter(p => p.activityType === ActivityType.VIEW).length,
          resourcesDownloaded: progress.filter(p => p.activityType === ActivityType.DOWNLOAD).length
        });
      }));
  }

  getUserProgressByActivityType(activityType: ActivityType): Observable<Progress[]> {
    return this.http.get<Progress[]>(`${this.apiUrl}/user/activity/${activityType}`)
      .pipe(catchError(() => {
        const allProgress = this.mockDataService.getMockProgress();
        return of(allProgress.filter(p => p.activityType === activityType));
      }));
  }
}
