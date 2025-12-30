import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ResourceService } from '../../services/resource.service';
import { MockDataService } from '../../services/mock-data.service';
import { User } from '../../models/user.model';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.css']
})
export class ProfessorDashboardComponent implements OnInit {
  currentUser: User | null = null;
  uploadedResources: Resource[] = [];
  
  stats = {
    totalResourcesUploaded: 0,
    totalDownloads: 0,
    totalViews: 0,
    averageRating: 0,
    activeQuizzes: 0,
    studentFeedback: 0
  };

  constructor(
    private authService: AuthService,
    private resourceService: ResourceService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadProfessorData();
  }

  loadProfessorData(): void {
    // Load professor's uploaded resources
    this.resourceService.getAllApprovedResources().subscribe(
      resources => {
        // Filter to simulate this professor's resources
        this.uploadedResources = resources.filter((_, i) => i % 3 === 0).slice(0, 10);
        this.updateStats();
      },
      error => {
        const resources = this.mockDataService.getMockResources();
        this.uploadedResources = resources.filter((_, i) => i % 3 === 0).slice(0, 10);
        this.updateStats();
      }
    );
  }

  private updateStats(): void {
    this.stats = {
      totalResourcesUploaded: this.uploadedResources.length,
      totalDownloads: this.uploadedResources.reduce((sum, r) => sum + (r.downloadCount || 0), 0),
      totalViews: this.uploadedResources.reduce((sum, r) => sum + (r.viewCount || 0), 0),
      averageRating: Math.floor(
        this.uploadedResources.reduce((sum, r) => sum + (r.averageRating || 0), 0) / this.uploadedResources.length
      ),
      activeQuizzes: this.mockDataService.getMockQuizzes().filter(q => q.createdById === this.currentUser?.id).length,
      studentFeedback: Math.floor(Math.random() * 50) + 10
    };
  }

  viewResource(resourceId: number): void {
    window.open(`/resource/${resourceId}`, '_blank');
  }

  createQuiz(): void {
    window.open('https://forms.google.com/create', '_blank');
  }
}
