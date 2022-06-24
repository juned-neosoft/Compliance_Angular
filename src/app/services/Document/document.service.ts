import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root' 
})
export class DocumentService {
  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  GetAllDocuments(formValue): any {
    var submitform={}
    return this.http.post(this.baseUrl + `getalldocuments`, submitform);
  }

  DownloadFile(docId): any {
    return this.http.get(this.baseUrl + `downloadProofOfCompliance?udoc_id=${docId}`,{responseType: 'blob'})
  }
  

}
