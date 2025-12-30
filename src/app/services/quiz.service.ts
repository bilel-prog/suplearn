import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Quiz, QuizAttempt } from '../models/quiz.model';
import { environment } from '../../environments/environment';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = `${environment.apiUrl}/quizzes`;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) {}

  getAllActiveQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/active`)
      .pipe(catchError(() => of(this.mockDataService.getMockQuizzes().filter(q => q.isActive))));
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`)
      .pipe(catchError(() => {
        const quizzes = this.mockDataService.getMockQuizzes();
        return of(quizzes[id - 1] || quizzes[0]);
      }));
  }

  getQuizzesBySubject(subjectId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/subject/${subjectId}`)
      .pipe(catchError(() => of(this.mockDataService.getQuizzesBySubject(subjectId))));
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.apiUrl}/create`, quiz)
      .pipe(catchError(() => of({ ...quiz, id: Math.floor(Math.random() * 10000) })));
  }

  recordQuizAttempt(attempt: QuizAttempt): Observable<QuizAttempt> {
    return this.http.post<QuizAttempt>(`${this.apiUrl}/attempt`, attempt)
      .pipe(catchError(() => of({ ...attempt, id: Math.floor(Math.random() * 10000) })));
  }

  getUserQuizHistory(): Observable<QuizAttempt[]> {
    return this.http.get<QuizAttempt[]>(`${this.apiUrl}/user/history`)
      .pipe(catchError(() => of(this.generateMockQuizHistory())));
  }

  getUserQuizStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/statistics`)
      .pipe(catchError(() => of({
        totalQuizzesAttempted: Math.floor(Math.random() * 25) + 5,
        averageScore: Math.floor(Math.random() * 30) + 65,
        totalQuizzesInSystem: this.mockDataService.getMockQuizzes().length,
        passedQuizzes: Math.floor(Math.random() * 20) + 3
      })));
  }

  /**
   * Open Google Form in a new window
   */
  openGoogleForm(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Generate mock quiz history for user
   */
  private generateMockQuizHistory(): QuizAttempt[] {
    const history: QuizAttempt[] = [];
    for (let i = 0; i < 15; i++) {
      history.push({
        id: i + 1,
        quizId: Math.floor(Math.random() * 50) + 1,
        userId: 1,
        score: Math.floor(Math.random() * 40) + 50,
        maxScore: 100,
        attemptedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        timeSpentMinutes: Math.floor(Math.random() * 25) + 10,
        isPassed: Math.random() > 0.3
      });
    }
    return history;
  }
}
