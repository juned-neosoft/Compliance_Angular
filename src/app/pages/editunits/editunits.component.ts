import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Unit } from 'src/app/models/Units/unit';
import { UnitsService } from 'src/app/services/Units/units.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editunits',
  templateUrl: './editunits.component.html',
  styleUrls: ['./editunits.component.css']
})

export class EditunitsComponent implements OnInit {
  public unitData = new Unit();
  public paramID = 0;

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private unitsService: UnitsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.paramID = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.onLoad();
  }

  onLoad() {
    this.spinner.show();

    this.unitsService.getPerticularUnit(this.paramID).subscribe(
      res => {
        console.log(res);
        this.unitData.loca_name = res.response.data.unit.loca_name;
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
      loca_id: this.paramID,
      loca_name: this.unitData.loca_name
    };

    this.unitsService.updateUnit(data).subscribe(
      resp => {
        this.alertify.success(`${this.unitData.loca_name} ${resp.response.message}`);
        this.spinner.hide();
        this.router.navigate(['units']);
      },
      error => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong`);
      }
    );
  }


}
