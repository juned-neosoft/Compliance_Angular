import { HttpClient,HttpParameterCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  SaveSupport(formValue) {
    var Query={Cname:formValue.Cname,Cemail:formValue.Cemail,Cmobile:formValue.Cmobile,Cmessage:formValue.Cmessage}
    return this.http.post(this.baseUrl + `getSupportQuery?jsonString=${encodeURIComponent(JSON.stringify(Query))}`,Query);
  }
}
