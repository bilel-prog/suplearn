import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource, ResourceType } from '../models/resource.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = `${environment.apiUrl}/resources`;

  constructor(private http: HttpClient) {}

  getAllApprovedResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/public`);
  }

  getResourceById(id: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.apiUrl}/view/${id}`);
  }

  getResourcesBySubject(subjectId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/subject/${subjectId}`);
  }

  getResourcesByType(type: ResourceType): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/type/${type}`);
  }

  searchResources(keyword: string): Observable<Resource[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Resource[]>(`${this.apiUrl}/search`, { params });
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
    return this.http.get<Resource[]>(`${this.apiUrl}/most-viewed`);
  }

  getMostDownloadedResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/most-downloaded`);
  }
}
