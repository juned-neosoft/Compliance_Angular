import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Designations } from 'src/app/models/Designations/designations';
import { DesignationsService } from 'src/app/services/Designations/designations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createdesignations',
  templateUrl: './createdesignations.component.html',
  styleUrls: ['./createdesignations.component.css']
})
export class CreatedesignationsComponent implements OnInit {
  public designationsData = new Designations();

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private designationsService: DesignationsService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();
    const data = {
      designation_name: this.designationsData.designation_name
    };
    this.designationsService.saveDesignations(data).subscribe(
      resp => {
        this.alertify.success(`${resp.response.data.designation_name} ${resp.response.message}`);
        this.spinner.hide();
        this.router.navigate(['designations']);
      },
      error => {
        this.spinner.hide();
        this.alertify.warning(`${this.designationsData.designation_name} is already exists.`);
      }
    );

    // this.functionsService.isExistFunctions(data).subscribe(
    //   res => {
    //     console.log(res);
    //     if (res.response.data.function_data.is_exists_by_name) {
    //       this.spinner.hide();
    //       this.alertify.warning(`${this.functionsData.dept_name} is already exists.`);
    //     } else {

    //     }
    //   },
    //   err => {
    //     this.spinner.hide();
    //     this.alertify.error(`Something went wrong`);
    //   }
    // );
  }
}
