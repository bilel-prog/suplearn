import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProgressService } from '../../services/progress.service';
import { User } from '../../models/user.model';
import { ProgressStatistics } from '../../models/progress.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats: ProgressStatistics = {
    totalStudyTimeMinutes: 0,
    resourcesViewed: 0,
    resourcesDownloaded: 0
  };

  constructor(
    private authService: AuthService,
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.progressService.getUserStatistics().subscribe(
      stats => this.stats = stats,
      error => console.error('Error loading statistics', error)
    );
  }
}
