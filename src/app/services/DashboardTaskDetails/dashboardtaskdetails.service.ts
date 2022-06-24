import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardtaskdetailsService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  ReasonForNonCompliance(data) {
    return this.http.post<any>(this.baseUrl + `updateTaskReasonForNonCompliance`, data);
  }

  DeleteTaskHistory(data) {
    return this.http.post<any>(this.baseUrl + `deleteTaskHistory`, data);
  }

  DeleteTaskDocument(data) {
    return this.http.post<any>(this.baseUrl + `deleteTaskDocument`, data);
  }

  ReopenTask(data) {
    return this.http.post<any>(this.baseUrl + `reopenTask`, data);
  }

  ApproveTask(data) {
    return this.http.post<any>(this.baseUrl + `approveTask`, data);
  }

  UpdateTasksConfiguration(data) {
    return this.http.post<any>(this.baseUrl + `updatetasksconfiguration`, data);
  }

  SaveTaskCompletion(jsonData, files) {
    var data = new FormData();

    if (files.length != 0) {
      for (var i = 0; i < files.length; i++) {
        data.append("ttrn_proof_of_compliance", files[i], files[i].name);
      }

      if (files.length == 0) {
        data.append("ttrn_proof_of_compliance", null);
      }

      // data.append('ttrn_proof_of_compliance', files);
      data.append('jsonString', JSON.stringify(jsonData));

      return this.http.post<any>(this.baseUrl + `savetaskcompletion`, data);
    }
    else {
      data.append('jsonString', JSON.stringify(jsonData));

      return this.http.post<any>(this.baseUrl + `savetaskcompletionwithoutfile`, data);
    }
  }
}
