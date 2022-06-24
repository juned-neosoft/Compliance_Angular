import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Functions } from 'src/app/models/Functions/functions';
import { FunctionsService } from 'src/app/services/Functions/functions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editfunctions',
  templateUrl: './editfunctions.component.html',
  styleUrls: ['./editfunctions.component.css']
})
export class EditfunctionsComponent implements OnInit {
  public functionsData = new Functions();
  public paramID = 0;

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private functionsService: FunctionsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.paramID = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.onLoad();
  }

  onLoad() {
    this.spinner.show();
    this.functionsService.getPerticularFunctions(this.paramID).subscribe(
      res => {
        this.functionsData.dept_name = res.response.data.function.dept_name;
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
      dept_id: this.paramID,
      dept_name: this.functionsData.dept_name
    };

    this.functionsService.updateFunctions(data).subscribe(
      resp => {
        this.alertify.success(`${this.functionsData.dept_name} ${resp.response.message}`);
        this.spinner.hide();
        this.router.navigate(['functions']);
      },
      error => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong`);
      }
    );
  }
}
