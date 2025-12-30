import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz, QuizAttempt } from '../models/quiz.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = `${environment.apiUrl}/quizzes`;

  constructor(private http: HttpClient) {}

  getAllActiveQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/active`);
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }

  getQuizzesBySubject(subjectId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/subject/${subjectId}`);
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.apiUrl}/create`, quiz);
  }

  recordQuizAttempt(attempt: QuizAttempt): Observable<QuizAttempt> {
    return this.http.post<QuizAttempt>(`${this.apiUrl}/attempt`, attempt);
  }

  getUserQuizHistory(): Observable<QuizAttempt[]> {
    return this.http.get<QuizAttempt[]>(`${this.apiUrl}/user/history`);
  }

  getUserQuizStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/statistics`);
  }

  openGoogleForm(url: string): void {
    window.open(url, '_blank');
  }
}
