import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {
  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  GenerateComplicanceCertificate(data) {
    return this.http.post(this.baseUrl + `generateCertificate`, data);
  }

  BindCertificate() {
    return this.http.get(this.baseUrl + `downloadCertificateDetails`);
  }

  DownloadDocument(dname) {
    return this.http.get(this.baseUrl + `downloadDocuments?certificate=${dname}`, { responseType: "blob" });
  }

  GenerateReport(data) {
    return this.http.post(this.baseUrl + `fetchreports`, data);
  }
}
