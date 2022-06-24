import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Entity } from 'src/app/models/Entity/entity';
import { EntityService } from 'src/app/services/Entity/entity.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editentity',
  templateUrl: './editentity.component.html',
  styleUrls: ['./editentity.component.css']
})
export class EditentityComponent implements OnInit {
  public entityData = new Entity();
  public getParentDropdownListData: any;
  public ValidateIDHasError = true;
  public paramID = 0;

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private entityService: EntityService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.paramID = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.onLoad();
  }

  onLoad() {
    this.spinner.show();

    this.entityService.getParentDropdownList().subscribe(
      res => {
        this.getParentDropdownListData = res.data.entity_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();
    this.entityService.getPerticularEntity(this.paramID).subscribe(
      res => {
        this.entityData.orga_name = res.response.data.entity.orga_name;
        this.entityData.orga_id = res.response.data.entity.orga_parent_id;
        this.ValidateIDHasError = false;
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
      orga_id: this.paramID,
      orga_name: this.entityData.orga_name,
      orga_parent_id: this.entityData.orga_id
    };

    this.entityService.updateEntity(data).subscribe(
      resp => {
        this.alertify.success(`${resp.response.message}`);
        this.spinner.hide();
        this.router.navigate(['\entity']);
      },
      error => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong`);
      }
    );
  }

  ValidateID(value) {
    if (value === '0' || value === 0) {
      this.ValidateIDHasError = true;
    } else {
      this.ValidateIDHasError = false;
    }
  }
}
