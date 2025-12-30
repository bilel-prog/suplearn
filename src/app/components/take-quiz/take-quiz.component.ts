import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { MockDataService } from '../../services/mock-data.service';
import { Quiz, QuizAttempt } from '../../models/quiz.model';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  quiz: Quiz | null = null;
  quizzes: Quiz[] = [];
  selectedQuizId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private quizService: QuizService,
    private mockDataService: MockDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.selectedQuizId = +id;
      this.loadQuiz(+id);
    } else {
      this.loadAllQuizzes();
    }
  }

  loadQuiz(quizId: number): void {
    this.loading = true;
    this.quizService.getQuizById(quizId).subscribe(
      quiz => {
        this.quiz = quiz;
        this.loading = false;
      },
      error => {
        console.error('Error loading quiz', error);
        const allQuizzes = this.mockDataService.getMockQuizzes();
        this.quiz = allQuizzes.find(q => q.id === quizId) || null;
        this.loading = false;
        if (!this.quiz) {
          this.error = 'Quiz not found';
        }
      }
    );
  }

  loadAllQuizzes(): void {
    this.loading = true;
    this.quizService.getAllActiveQuizzes().subscribe(
      quizzes => {
        this.quizzes = quizzes;
        this.loading = false;
      },
      error => {
        console.error('Error loading quizzes', error);
        this.quizzes = this.mockDataService.getMockQuizzes();
        this.loading = false;
      }
    );
  }

  /**
   * Open Google Form to take the quiz
   */
  takeQuiz(quiz: Quiz): void {
    if (quiz.googleFormUrl) {
      // Record the quiz attempt in mock data
      const attempt: QuizAttempt = {
        quizId: quiz.id!,
        userId: 1, // Current user (mock)
        score: 0,
        maxScore: 100,
        attemptedAt: new Date(),
        timeSpentMinutes: 0,
        isPassed: false
      };

      this.quizService.recordQuizAttempt(attempt).subscribe(
        () => {
          // Open Google Form
          this.quizService.openGoogleForm(quiz.googleFormUrl!);
        },
        error => {
          console.error('Error recording quiz attempt', error);
          // Still open the form even if recording fails
          this.quizService.openGoogleForm(quiz.googleFormUrl!);
        }
      );
    } else {
      this.error = 'Quiz form URL not available';
    }
  }

  selectQuiz(quizId: number): void {
    this.selectedQuizId = quizId;
    const selected = this.quizzes.find(q => q.id === quizId);
    if (selected) {
      this.quiz = selected;
    }
  }

  goBack(): void {
    this.quiz = null;
    this.selectedQuizId = null;
    this.loadAllQuizzes();
  }
}
