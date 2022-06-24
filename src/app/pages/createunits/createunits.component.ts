import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Unit } from 'src/app/models/Units/unit';
import { UnitsService } from 'src/app/services/Units/units.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createunits',
  templateUrl: './createunits.component.html',
  styleUrls: ['./createunits.component.css']
})
export class CreateunitsComponent implements OnInit {
  public unitData = new Unit();
  public ValidateIDHasError = true;

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private unitService: UnitsService
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.spinner.show();
    const data = {
      loca_name: this.unitData.loca_name
    };

    this.unitService.isLocaNameExist(data).subscribe(
      res => {
        if (res.response.data.is_exists) {
          this.spinner.hide();
          this.alertify.warning(`${this.unitData.loca_name} is already exists.`);
        } else {
          this.unitService.saveUnit(data).subscribe(
            resp => {
              this.alertify.success(`${resp.response.data.loca_name} ${resp.response.message}`);
              this.spinner.hide();
              this.router.navigate(['units']);
            },
            error => {
              this.spinner.hide();
              this.alertify.error(`Something went wrong`);
            }
          );
        }
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong`);
      }
    );
  }

}
