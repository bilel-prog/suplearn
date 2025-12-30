import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Schedule } from '../models/schedule.model';
import { environment } from '../../environments/environment';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = `${environment.apiUrl}/schedule`;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) {}

  createSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.apiUrl}`, schedule)
      .pipe(catchError(() => of({ ...schedule, id: Math.floor(Math.random() * 10000) })));
  }

  getScheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${id}`)
      .pipe(catchError(() => {
        const schedules = this.mockDataService.getMockSchedules();
        return of(schedules[id - 1] || schedules[0]);
      }));
  }

  getUserSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/user`)
      .pipe(catchError(() => of(this.mockDataService.getMockSchedules())));
  }

  getUpcomingSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/user/upcoming`)
      .pipe(catchError(() => {
        const schedules = this.mockDataService.getMockSchedules();
        const now = new Date();
        return of(schedules.filter(s => new Date(s.scheduledDate) >= now).slice(0, 10));
      }));
  }

  getUserScheduleInDateRange(startDate: Date, endDate: Date): Observable<Schedule[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<Schedule[]>(`${this.apiUrl}/user/daterange`, { params })
      .pipe(catchError(() => {
        const schedules = this.mockDataService.getMockSchedules();
        return of(schedules.filter(s => {
          const date = new Date(s.scheduledDate);
          return date >= startDate && date <= endDate;
        }));
      }));
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${schedule.id}`, schedule)
      .pipe(catchError(() => of(schedule)));
  }

  markScheduleAsCompleted(id: number): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${id}/complete`, {})
      .pipe(catchError(() => {
        const schedules = this.mockDataService.getMockSchedules();
        const schedule = schedules.find(s => s.id === id);
        if (schedule) schedule.isCompleted = true;
        return of(schedule || { id, isCompleted: true } as any);
      }));
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(() => of(undefined)));
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
