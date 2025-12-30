import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { AcademicService } from '../../services/academic.service';
import { Resource } from '../../models/resource.model';
import { Year, Module, Subject } from '../../models/academic.model';
import { STATIC_ACADEMIC_DATA, StaticYear, StaticModule } from '../../models/academic-static-data';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {
  resources: Resource[] = [];
  allResources: Resource[] = [];
  years: Year[] = [];
  modules: Module[] = [];
  subjects: Subject[] = [];
  
  selectedYear = '';
  selectedModule = '';
  selectedSubject = '';
  selectedType = '';

  constructor(
    private resourceService: ResourceService,
    private academicService: AcademicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadYears();
    this.loadResources();
    
    // Check for search query parameter
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchResources(params['search']);
      }
    });
  }

  loadYears(): void {
    this.academicService.getAllYears().subscribe(
      years => {
        if (years && years.length) {
          this.years = years;
        } else {
          this.years = STATIC_ACADEMIC_DATA.map(({ id, name }) => ({ id, name } as Year));
        }
        console.log('Loaded years:', this.years);
      },
      error => {
        console.error('Error loading years', error);
        this.years = STATIC_ACADEMIC_DATA.map(({ id, name }) => ({ id, name } as Year));
      }
    );
  }

  onYearChange(): void {
    if (this.selectedYear) {
      const yearId = +this.selectedYear;
      const selectedYear: StaticYear | undefined = STATIC_ACADEMIC_DATA.find(y => y.id === yearId);

      this.academicService.getModulesByYear(yearId).subscribe(
        modules => {
          this.modules = (modules && modules.length ? modules : selectedYear?.modules) || [];
          console.log('Loaded modules:', this.modules);
        },
        error => {
          console.error('Error loading modules', error);
          this.modules = selectedYear?.modules || [];
        }
      );
    } else {
      this.modules = [];
    }
    this.selectedModule = '';
    this.selectedSubject = '';
    this.subjects = [];
    this.loadResources();
  }

  onModuleChange(): void {
    if (this.selectedModule) {
      const moduleId = +this.selectedModule;
      const yearId = +this.selectedYear;
      const selectedYear: StaticYear | undefined = STATIC_ACADEMIC_DATA.find(y => y.id === yearId);
      const staticModule: StaticModule | undefined = selectedYear?.modules?.find(m => m.id === moduleId);

      this.academicService.getSubjectsByModule(moduleId).subscribe(
        subjects => {
          this.subjects = (subjects && subjects.length ? subjects : staticModule?.subjects) || [];
          console.log('Loaded subjects:', this.subjects);
        },
        error => {
          console.error('Error loading subjects', error);
          this.subjects = staticModule?.subjects || [];
        }
      );
    } else {
      this.subjects = [];
    }
    this.selectedSubject = '';
    this.loadResources();
  }

  onSubjectChange(): void {
    this.loadResources();
  }

  onTypeChange(): void {
    this.applyTypeFilter();
  }

  loadResources(): void {
    if (this.selectedSubject) {
      this.resourceService.getResourcesBySubject(+this.selectedSubject).subscribe(
        resources => {
          this.allResources = resources || [];
          this.applyTypeFilter();
          console.log('Loaded resources by subject:', this.resources);
        },
        error => {
          console.error('Error loading resources', error);
          this.allResources = [];
          this.resources = [];
        }
      );
    } else {
      this.resourceService.getAllApprovedResources().subscribe(
        resources => {
          this.allResources = resources || [];
          this.applyTypeFilter();
          console.log('Loaded all resources:', this.resources);
        },
        error => {
          console.error('Error loading resources', error);
          this.allResources = [];
          this.resources = [];
        }
      );
    }
  }

  private applyTypeFilter(): void {
    if (this.selectedType) {
      this.resources = this.allResources.filter(r => r.type === this.selectedType);
    } else {
      this.resources = [...this.allResources];
    }
  }

  searchResources(keyword: string): void {
    this.resourceService.searchResources(keyword).subscribe(
      resources => this.resources = resources,
      error => console.error('Error searching resources', error)
    );
  }
}
