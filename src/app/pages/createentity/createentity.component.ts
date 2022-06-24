import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Entity } from 'src/app/models/Entity/entity';
import { EntityService } from 'src/app/services/Entity/entity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createentity',
  templateUrl: './createentity.component.html',
  styleUrls: ['./createentity.component.css']
})
export class CreateentityComponent implements OnInit {
  public entityData = new Entity();
  public getParentDropdownListData: any;
  public ValidateIDHasError = true;

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private entityService: EntityService
  ) { }

  ngOnInit() {
    this.onLoad();
  }

  onSubmit() {
    this.spinner.show();
    const data = {
      orga_name: this.entityData.orga_name,
      orga_parent_id: this.entityData.orga_id
    };

    this.entityService.isExistEntity(data).subscribe(
      res => {
        if (res.response.data.is_entity_exists) {
          this.spinner.hide();
          this.alertify.warning(`${this.entityData.orga_name} is already exists.`);
        } else {
          this.entityService.saveEntity(data).subscribe(
            resp => {
              this.alertify.success(`${resp.response.data.orga_name} ${resp.response.message}`);
              this.spinner.hide();
              this.router.navigate(['entity']);
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
  }

  ValidateID(value) {
    if (value === '0' || value === 0) {
      this.ValidateIDHasError = true;
    } else {
      this.ValidateIDHasError = false;
    }
  }

}
