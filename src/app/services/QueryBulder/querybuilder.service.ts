import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuerybuilderService {
  baseUrl=environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  DeleteTask(Ids)
  {
    var objec={clientTasksId:Ids}
    return this.http.post(this.baseUrl+`queryBuilder`,objec);
  }

  DeActivationTask(Ids)
  {
    var objec={tasksId:Ids}
    return this.http.post(this.baseUrl+`queryDeActivation`,objec);
  }

  DesableTask(Ids)
  {
    var objec={cTasksId:Ids}
    return this.http.post(this.baseUrl+`queryDeActivation`,objec);
  }
}
