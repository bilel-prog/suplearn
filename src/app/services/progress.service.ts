import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Progress, ProgressStatistics, ActivityType } from '../models/progress.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private apiUrl = `${environment.apiUrl}/progress`;

  constructor(private http: HttpClient) {}

  trackProgress(progress: Progress): Observable<Progress> {
    return this.http.post<Progress>(`${this.apiUrl}/track`, progress);
  }

  getUserProgress(): Observable<Progress[]> {
    return this.http.get<Progress[]>(`${this.apiUrl}/user`);
  }

  getUserProgressInDateRange(startDate: Date, endDate: Date): Observable<Progress[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<Progress[]>(`${this.apiUrl}/user/daterange`, { params });
  }

  getUserStatistics(): Observable<ProgressStatistics> {
    return this.http.get<ProgressStatistics>(`${this.apiUrl}/user/statistics`);
  }

  getUserProgressByActivityType(activityType: ActivityType): Observable<Progress[]> {
    return this.http.get<Progress[]>(`${this.apiUrl}/user/activity/${activityType}`);
  }
}
