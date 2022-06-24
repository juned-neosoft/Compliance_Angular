import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Designations } from 'src/app/models/Designations/designations';
import { DesignationsService } from 'src/app/services/Designations/designations.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editdesignations',
  templateUrl: './editdesignations.component.html',
  styleUrls: ['./editdesignations.component.css']
})
export class EditdesignationsComponent implements OnInit {
  public designationsData = new Designations();
  public paramID = 0;

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private designationsService: DesignationsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.paramID = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.onLoad();
  }

  onLoad() {
    this.spinner.show();
    this.designationsService.getPerticularDesignation(this.paramID).subscribe(
      res => {
        this.designationsData.designation_name = res.response.data.designation_data.desi_name;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );
  }

  onSubmit() {
    this.spinner.show();
    const data = {
      designation_id: this.paramID,
      designation_name: this.designationsData.designation_name
    };

    this.designationsService.updateDesignations(data).subscribe(
      resp => {
        this.alertify.success(`${this.designationsData.designation_name} ${resp.response.message}`);
        this.spinner.hide();
        this.router.navigate(['designations']);
      },
      error => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong`);
      }
    );
  }
}
