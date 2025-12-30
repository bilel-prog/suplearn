import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { Resource } from '../../models/resource.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit {
  resource: Resource | null = null;
  resourceId!: number;

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resourceId = +params['id'];
      this.loadResource();
    });
  }

  loadResource(): void {
    this.resourceService.getResourceById(this.resourceId).subscribe(
      resource => this.resource = resource,
      error => {
        console.error('Error loading resource', error);
        this.router.navigate(['/resources']);
      }
    );
  }

  downloadResource(): void {
    this.resourceService.downloadResource(this.resourceId).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.resource?.fileName || 'download';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error => console.error('Error downloading resource', error)
    );
  }

  getStatusBadgeClass(): string {
    switch (this.resource?.status) {
      case 'APPROVED': return 'badge-approved';
      case 'PENDING': return 'badge-pending';
      case 'REJECTED': return 'badge-rejected';
      default: return '';
    }
  }

  formatFileSize(bytes: number | undefined): string {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB';
  }

  goBack(): void {
    this.location.back();
  }
}
