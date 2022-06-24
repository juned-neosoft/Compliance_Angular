import { Injectable } from '@angular/core';
import { HttpClient, HttpParameterCodec, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ShowcausenoticeService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList(data) {
    return this.http.post<any>(this.baseUrl + `getAllShowCauseNotice`, data);
  }

  // getEntityUnitFunctionUser() {
  //   return this.http.get(this.baseUrl + `getAccessWiseOrgaLocaDept`);
  // }

  GetEntityUnitFunctionUser() {
    var data;
    return this.http.post(this.baseUrl + `getAccessWiseOrgaLocaDept`, data);
  }

  InsertShowCauseNotice(formval, documnts) {
    var Query: any = {
      scau_orga_id: Number(formval.scau_orga_id),
      scau_loca_id: Number(formval.scau_loca_id),
      scau_dept_id: Number(formval.scau_dept_id),
      scau_ralated_to: formval.scau_ralated_to,
      scau_comments: formval.scau_comments,
      scau_action_taken: formval.scau_action_taken,
      scau_next_action_item: formval.scau_next_action_item,
      scau_responsible_person: Number(formval.scau_responsible_person),
      scau_reporting_person: Number(formval.scau_reporting_person),
      scau_notice_date: formval.scau_notice_date,
      scau_received_date: formval.scau_received_date,
      scau_deadline_date: formval.scau_deadline_date,
      scau_remainder_date: formval.scau_remainder_date
    }
    var formdata = new FormData();
    for (var i = 0; i < documnts.length; i++) {
      formdata.append("show_cause_doc", documnts[i], documnts[i].name);
    }
    formdata.append("jsonString", JSON.stringify(Query));

    return this.http.post(this.baseUrl + `saveShowCauseNotice`, formdata);
  }

  EditShowCuaseNotice(Id) {
    var obj = { scau_id: Number(Id) };
    return this.http.post(this.baseUrl + `getShowCauseNoticeDetails`, obj);
  }

  UpdateShowCauseNotice(formval, documnts, Id) {
    var Query: any = {
      scau_id: Number(Id),
      scau_orga_id: Number(formval.scau_orga_id),
      scau_loca_id: Number(formval.scau_loca_id),
      scau_dept_id: Number(formval.scau_dept_id),
      scau_ralated_to: formval.scau_ralated_to,
      scau_comments: formval.scau_comments,
      scau_action_taken: formval.scau_action_taken,
      scau_next_action_item: formval.scau_next_action_item,
      scau_responsible_person: Number(formval.scau_responsible_person),
      scau_reporting_person: Number(formval.scau_reporting_person),
      scau_notice_date: formval.scau_notice_date,
      scau_received_date: formval.scau_received_date,
      scau_deadline_date: formval.scau_deadline_date,
      scau_remainder_date: formval.scau_remainder_date
    }


    var formdata = new FormData();
    for (var i = 0; i < documnts.length; i++) {
      formdata.append("show_cause_doc", documnts[i], documnts[i].name);
    }
    formdata.append("jsonString", JSON.stringify(Query));

    return this.http.post(this.baseUrl + `updateShowCauseNotice`, formdata);
  }
}
