import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating, Comment } from '../models/feedback.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Ratings
  addOrUpdateRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiUrl}/ratings`, rating);
  }

  getResourceRatings(resourceId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/ratings/resource/${resourceId}`);
  }

  getAverageRating(resourceId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ratings/resource/${resourceId}/average`);
  }

  // Comments
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);
  }

  getResourceComments(resourceId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/resource/${resourceId}`);
  }

  getReplies(parentCommentId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/${parentCommentId}/replies`);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/comments/${comment.id}`, comment);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${id}`);
  }
}
