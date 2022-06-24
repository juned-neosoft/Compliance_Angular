import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskmappingassigntaskService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  taskMappingAssignTaskSearch(data) {
    return this.http.post<any>(this.baseUrl + `getTaskListToAssign?pagination=false`, data);
  }

  savetasksusermapping(data) {
    return this.http.post<any>(this.baseUrl + `savetasksusermapping`, data);
  }

  uploadAssignTaskList(data){
    return this.http.post<any>(this.baseUrl + `uploadAssignTaskList`, data);
  }
}


