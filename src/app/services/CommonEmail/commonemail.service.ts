import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonemailService {
  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getAllEntityUnitFunctionUser() {

    var data;
    return this.http.post(this.baseUrl + `getuserwithaccessforcommonemail`, data);
  }

  SenCommonEmail(formval, doc, arrayUser) {

    var Emials = Array.prototype.map.call(arrayUser, function (item) { return item.user_email; }).join(",");

    var Query = {
      email_ids: [Emials],
      subject: formval.subject,
      body: formval.body
    }

    var formdata = new FormData();
    for (var i = 0; i < doc.length; i++) {
      formdata.append("ttrn_proof_of_compliance", doc[i], doc[i].name);
    }
    formdata.append("jsonString", JSON.stringify(Query));
    return this.http.post(this.baseUrl + `sendcommonemail`, formdata);
  }
}
