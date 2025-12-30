import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchKeyword = '';
  popularResources: Resource[] = [];

  constructor(
    private resourceService: ResourceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPopularResources();
  }

  loadPopularResources(): void {
    this.resourceService.getMostViewedResources().subscribe(
      resources => {
        this.popularResources = resources.slice(0, 4);
      },
      error => console.error('Error loading popular resources', error)
    );
  }

  search(): void {
    if (this.searchKeyword.trim()) {
      this.router.navigate(['/resources'], { 
        queryParams: { search: this.searchKeyword } 
      });
    }
  }
}
