import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.post<Rating>(`${this.apiUrl}/ratings`, rating)
      .pipe(catchError(() => of({ ...rating, id: Math.floor(Math.random() * 10000) })));
  }

  getResourceRatings(resourceId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/ratings/resource/${resourceId}`)
      .pipe(catchError(() => of(this.generateMockRatings(resourceId))));
  }

  getAverageRating(resourceId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ratings/resource/${resourceId}/average`)
      .pipe(catchError(() => of(Math.floor(Math.random() * 50) / 10)));
  }

  // Comments
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment)
      .pipe(catchError(() => of({ ...comment, id: Math.floor(Math.random() * 10000) })));
  }

  getResourceComments(resourceId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/resource/${resourceId}`)
      .pipe(catchError(() => of(this.generateMockComments(resourceId))));
  }

  getReplies(parentCommentId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/${parentCommentId}/replies`)
      .pipe(catchError(() => of(this.generateMockReplies(parentCommentId))));
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/comments/${comment.id}`, comment)
      .pipe(catchError(() => of(comment)));
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  /**
   * Generate mock ratings for a resource
   */
  private generateMockRatings(resourceId: number): Rating[] {
    const ratings: Rating[] = [];
    const count = Math.floor(Math.random() * 15) + 5; // 5-20 ratings

    for (let i = 0; i < count; i++) {
      ratings.push({
        id: i + 1,
        resourceId,
        userId: Math.floor(Math.random() * 100) + 1,
        score: Math.floor(Math.random() * 50) / 10, // 0-5
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      });
    }

    return ratings;
  }

  /**
   * Generate mock comments for a resource
   */
  private generateMockComments(resourceId: number): Comment[] {
    const commentTexts = [
      'Great resource! Very helpful for understanding the concepts.',
      'This material is well-organized and easy to follow.',
      'Excellent examples and clear explanations.',
      'Perfect for exam preparation.',
      'Highly recommended for all students.',
      'The examples are very practical.',
      'Very comprehensive coverage of the topic.',
      'Clear and concise presentation.',
      'Excellent resource for self-study.'
    ];

    const comments: Comment[] = [];
    const count = Math.floor(Math.random() * 8) + 2; // 2-10 comments

    for (let i = 0; i < count; i++) {
      comments.push({
        id: i + 1,
        resourceId,
        userId: Math.floor(Math.random() * 100) + 1,
        userName: `Student ${Math.floor(Math.random() * 1000)}`,
        text: commentTexts[Math.floor(Math.random() * commentTexts.length)],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        likes: Math.floor(Math.random() * 20)
      });
    }

    return comments;
  }

  /**
   * Generate mock replies for a comment
   */
  private generateMockReplies(parentCommentId: number): Comment[] {
    const replyTexts = [
      'Thanks for sharing!',
      'I agree with this.',
      'Well said!',
      'Very insightful comment.',
      'Couldn\'t agree more.'
    ];

    const replies: Comment[] = [];
    const count = Math.floor(Math.random() * 3); // 0-2 replies

    for (let i = 0; i < count; i++) {
      replies.push({
        id: parentCommentId * 100 + i + 1,
        resourceId: 0,
        parentCommentId,
        userId: Math.floor(Math.random() * 100) + 1,
        userName: `Student ${Math.floor(Math.random() * 1000)}`,
        text: replyTexts[Math.floor(Math.random() * replyTexts.length)],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      });
    }

    return replies;
  }
}
