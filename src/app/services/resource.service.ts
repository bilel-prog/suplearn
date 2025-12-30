import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resource, ResourceType } from '../models/resource.model';
import { environment } from '../../environments/environment';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = `${environment.apiUrl}/resources`;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) {}

  getAllApprovedResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/public`)
      .pipe(catchError(() => of(this.mockDataService.getMockResources())));
  }

  getResourceById(id: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.apiUrl}/view/${id}`)
      .pipe(catchError(() => {
        const resources = this.mockDataService.getMockResources();
        return of(resources[id - 1] || resources[0]);
      }));
  }

  getResourcesBySubject(subjectId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/subject/${subjectId}`)
      .pipe(catchError(() => of(this.mockDataService.getResourcesBySubject(subjectId))));
  }

  getResourcesByType(type: ResourceType): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/type/${type}`)
      .pipe(catchError(() => of(this.mockDataService.getMockResources().filter(r => r.type === type))));
  }

  searchResources(keyword: string): Observable<Resource[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Resource[]>(`${this.apiUrl}/search`, { params })
      .pipe(catchError(() => {
        const allResources = this.mockDataService.getMockResources();
        return of(allResources.filter(r =>
          r.title.toLowerCase().includes(keyword.toLowerCase()) ||
          r.description.toLowerCase().includes(keyword.toLowerCase())
        ));
      }));
  }

  uploadResource(file: File, resource: any): Observable<Resource> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', resource.title);
    formData.append('description', resource.description);
    formData.append('type', resource.type);
    formData.append('subjectId', resource.subjectId.toString());
    
    return this.http.post<Resource>(`${this.apiUrl}/upload/anonymous`, formData);
  }

  downloadResource(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${id}`, { 
      responseType: 'blob' 
    });
  }

  getMostViewedResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/most-viewed`)
      .pipe(catchError(() => {
        const resources = this.mockDataService.getMockResources();
        return of(resources.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 10));
      }));
  }

  getMostDownloadedResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/most-downloaded`)
      .pipe(catchError(() => {
        const resources = this.mockDataService.getMockResources();
        return of(resources.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0)).slice(0, 10));
      }));
  }
}
