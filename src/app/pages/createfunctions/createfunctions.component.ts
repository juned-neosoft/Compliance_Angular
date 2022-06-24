import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Functions } from 'src/app/models/Functions/functions';
import { FunctionsService } from 'src/app/services/Functions/functions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createfunctions',
  templateUrl: './createfunctions.component.html',
  styleUrls: ['./createfunctions.component.css']
})
export class CreatefunctionsComponent implements OnInit {
  public functionsData = new Functions();

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private functionsService: FunctionsService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();
    const data = {
      dept_name: this.functionsData.dept_name
    };
    this.functionsService.saveFunctions(data).subscribe(
      resp => {
        this.alertify.success(`${resp.response.data.department_data.dept_name} ${resp.response.message}`);
        this.spinner.hide();
        this.router.navigate(['functions']);
      },
      error => {
        this.spinner.hide();
        this.alertify.warning(`${this.functionsData.dept_name} is already exists.`);
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
