import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProgressService } from '../../services/progress.service';
import { ResourceService } from '../../services/resource.service';
import { ScheduleService } from '../../services/schedule.service';
import { QuizService } from '../../services/quiz.service';
import { MockDataService } from '../../services/mock-data.service';
import { User } from '../../models/user.model';
import { Resource } from '../../models/resource.model';
import { Schedule } from '../../models/schedule.model';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  currentUser: User | null = null;
  
  stats: any = {
    totalStudyTimeMinutes: 9360,
    resourcesViewed: 45,
    resourcesDownloaded: 23,
    quizzesCompleted: 12,
    averageScore: 78.5,
    totalStudyHours: 156,
    currentLevel: 'Intermediate',
    completionRate: 62
  };

  recentResources: Resource[] = [];
  upcomingSchedules: Schedule[] = [];
  availableQuizzes: Quiz[] = [];
  bookmarkedResources: Resource[] = [];
  mostViewedSubjects: any[] = [];
  recentActivities: any[] = [];

  constructor(
    private authService: AuthService,
    private progressService: ProgressService,
    private resourceService: ResourceService,
    private scheduleService: ScheduleService,
    private quizService: QuizService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load statistics
    this.progressService.getUserStatistics().subscribe(
      stats => {
        this.stats = { ...this.stats, ...stats };
      },
      error => console.error('Error loading statistics', error)
    );

    // Load recent resources
    this.resourceService.getMostViewedResources().subscribe(
      resources => {
        this.recentResources = resources.slice(0, 6);
      },
      error => {
        this.recentResources = this.mockDataService.getMockResources().slice(0, 6);
      }
    );

    // Load upcoming schedules
    this.scheduleService.getUpcomingSchedules().subscribe(
      schedules => {
        this.upcomingSchedules = schedules.slice(0, 5);
      },
      error => {
        this.upcomingSchedules = this.mockDataService.getMockSchedules().slice(0, 5);
      }
    );

    // Load available quizzes
    this.quizService.getAllActiveQuizzes().subscribe(
      quizzes => {
        this.availableQuizzes = quizzes.slice(0, 5);
      },
      error => {
        this.availableQuizzes = this.mockDataService.getMockQuizzes().slice(0, 5);
      }
    );

    // Load dashboard stats from mock service
    const dashboardStats = this.mockDataService.getDashboardStats();
    this.mostViewedSubjects = dashboardStats.mostViewedSubjects;
    this.recentActivities = dashboardStats.recentActivities;
    
    // Simulate bookmarked resources
    this.bookmarkedResources = this.mockDataService.getMockResources().slice(0, 4);
  }

  openResource(resourceId: number): void {
    // Navigate to resource detail or open in new window
    window.open(`/resource/${resourceId}`, '_blank');
  }

  takeQuiz(quizId: number): void {
    const quiz = this.availableQuizzes.find(q => q.id === quizId);
    if (quiz && quiz.googleFormUrl) {
      this.quizService.openGoogleForm(quiz.googleFormUrl);
    }
  }

  viewSchedule(scheduleId: number): void {
    console.log('View schedule:', scheduleId);
  }

  downloadResource(resourceId: number): void {
    this.resourceService.downloadResource(resourceId).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `resource_${resourceId}`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error => console.error('Error downloading resource', error)
    );
  }
}
