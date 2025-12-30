import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ResourceService } from '../../services/resource.service';
import { MockDataService } from '../../services/mock-data.service';
import { User } from '../../models/user.model';
import { Resource, ApprovalStatus } from '../../models/resource.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentUser: User | null = null;
  pendingResources: Resource[] = [];
  approvedResources: Resource[] = [];
  
  stats = {
    totalResources: 0,
    pendingApproval: 0,
    approvedCount: 0,
    rejectedCount: 0,
    totalUsers: 0,
    activeStudents: 0,
    totalDownloads: 0,
    averageRating: 0
  };

  constructor(
    private authService: AuthService,
    private resourceService: ResourceService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadAdminData();
  }

  loadAdminData(): void {
    // Load resources for moderation
    this.resourceService.getAllApprovedResources().subscribe(
      resources => {
        // Filter actual pending resources from mock data
        const allResources = this.mockDataService.getMockResources();
        this.pendingResources = allResources.filter(r => r.status === ApprovalStatus.PENDING);
        this.approvedResources = allResources.filter(r => r.status === ApprovalStatus.APPROVED).slice(0, 10);
        this.updateStats(allResources);
      },
      error => {
        const allResources = this.mockDataService.getMockResources();
        this.pendingResources = allResources.filter(r => r.status === ApprovalStatus.PENDING);
        this.approvedResources = allResources.filter(r => r.status === ApprovalStatus.APPROVED).slice(0, 10);
        this.updateStats(allResources);
      }
    );
  }

  private updateStats(allResources: Resource[]): void {
    const approved = allResources.filter(r => r.status === ApprovalStatus.APPROVED).length;
    const rejected = allResources.filter(r => r.status === ApprovalStatus.REJECTED).length;
    const pending = allResources.filter(r => r.status === ApprovalStatus.PENDING).length;

    this.stats = {
      totalResources: allResources.length,
      pendingApproval: pending,
      approvedCount: approved,
      rejectedCount: rejected,
      totalUsers: Math.floor(Math.random() * 200) + 100,
      activeStudents: Math.floor(Math.random() * 150) + 50,
      totalDownloads: allResources.reduce((sum, r) => sum + (r.downloadCount || 0), 0),
      averageRating: Math.floor(
        allResources.reduce((sum, r) => sum + (r.averageRating || 0), 0) / allResources.length
      )
    };
  }

  approveResource(resourceId: number): void {
    console.log('Approving resource:', resourceId);
    // Move from pending to approved
    const index = this.pendingResources.findIndex(r => r.id === resourceId);
    if (index > -1) {
      const resource = this.pendingResources[index];
      resource.status = ApprovalStatus.APPROVED;
      this.approvedResources.push(this.pendingResources.splice(index, 1)[0]);
    }
  }

  rejectResource(resourceId: number): void {
    console.log('Rejecting resource:', resourceId);
    // Move from pending to rejected
    const index = this.pendingResources.findIndex(r => r.id === resourceId);
    if (index > -1) {
      const resource = this.pendingResources[index];
      resource.status = ApprovalStatus.REJECTED;
      this.pendingResources.splice(index, 1);
    }
  }

  viewResource(resourceId: number): void {
    window.open(`/resource/${resourceId}`, '_blank');
  }
}
