import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LegaltaskimportService {
   baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }

  UploadLeagalTaskImport(fromData,FileName)
  {
   return this.http.post(this.baseUrl+`importlegalupdatesfromfile?name=${FileName}`,fromData);
  }
}
