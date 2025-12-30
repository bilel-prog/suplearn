import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../models/schedule.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = `${environment.apiUrl}/schedule`;

  constructor(private http: HttpClient) {}

  createSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.apiUrl}`, schedule);
  }

  getScheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${id}`);
  }

  getUserSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/user`);
  }

  getUpcomingSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/user/upcoming`);
  }

  getUserScheduleInDateRange(startDate: Date, endDate: Date): Observable<Schedule[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<Schedule[]>(`${this.apiUrl}/user/daterange`, { params });
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${schedule.id}`, schedule);
  }

  markScheduleAsCompleted(id: number): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${id}/complete`, {});
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  syncWithGoogleCalendar(schedule: Schedule): void {
    // TODO: Implement Google Calendar API integration
    console.log('Syncing with Google Calendar:', schedule);
  }

  syncWithMicrosoftCalendar(schedule: Schedule): void {
    // TODO: Implement Microsoft Calendar API integration
    console.log('Syncing with Microsoft Calendar:', schedule);
  }
}
