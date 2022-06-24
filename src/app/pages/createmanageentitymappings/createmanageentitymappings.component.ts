import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Manageentitymappings } from 'src/app/models/ManageEntityMappings/manageentitymappings';
import { ManageentitymappingsService } from 'src/app/services/ManageEntityMappings/manageentitymappings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createmanageentitymappings',
  templateUrl: './createmanageentitymappings.component.html',
  styleUrls: ['./createmanageentitymappings.component.css']
})
export class CreatemanageentitymappingsComponent implements OnInit {
  public manageentitymappingsData = new Manageentitymappings();
  public entityMethodHasError = true;
  public unitMethodHasError = true;
  public functionMethodHasError = true;

  public entityDropdown: any;
  public unitDropdown: any;
  public functionDropdown: any;
  public getMappedDepartmentsList: any;

  public selectedEntityName: string;
  public selectedUnitName: string;

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private manageentitymappingsService: ManageentitymappingsService
  ) {
  }

  ngOnInit() {
    this.manageentitymappingsData.entity = 0;
    this.manageentitymappingsData.unit = 0;
    this.manageentitymappingsData.functions = 0;

    this.onLoad();
  }

  onSubmit() {
    var data = {
      enti_orga_id: this.manageentitymappingsData.entity,
      enti_loca_id: this.manageentitymappingsData.unit,
      functions_Array: this.manageentitymappingsData.functions
    };

    this.manageentitymappingsService.saveManageEntityMapping(data).subscribe(
      res => {
        this.alertify.success(`${res.response.message}`);
        this.spinner.hide();
        this.router.navigate(['manageentitymappings']);
      },
      err => {
        this.spinner.hide();
        this.alertify.warning(`Something went wrong`);
      }
    );
  }

  onLoad() {
    this.spinner.show();
    this.manageentitymappingsService.loadEntity().subscribe(
      res => {
        this.entityDropdown = res.data;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.entityDropdown = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();
    this.manageentitymappingsService.loadUnit().subscribe(
      res => {
        this.unitDropdown = res.data;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.unitDropdown = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();
    this.manageentitymappingsService.loadFunction().subscribe(
      res => {
        this.functionDropdown = res.data;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.functionDropdown = [];
        this.alertify.error(`Data not found`);
      }
    );

  }

  entityMethod(value) {
    if (value === '0' || value === 0) {
      this.entityMethodHasError = true;
    } else {
      this.entityMethodHasError = false;
    }
  }

  unitMethod(value) {
    this.spinner.show();
    var data = {
      enti_loca_id: parseInt(this.manageentitymappingsData.entity.toString()),
      enti_orga_id: parseInt(this.manageentitymappingsData.unit.toString())
    };
    this.manageentitymappingsService.loadFunctionDepends(data).subscribe(
      res => {
        this.functionDropdown = [];
        this.manageentitymappingsData.functions = 0;
        this.functionDropdown = res.response.data.data_list.unmappedDepartments;
        this.getMappedDepartmentsList = res.response.data.data_list.mappedDepartments;

        this.selectedEntityName = this.getEntityName(this.manageentitymappingsData.entity);
        this.selectedUnitName = this.getUnitName(this.manageentitymappingsData.unit);

        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.functionDropdown = [];
        this.alertify.error(`Data not found`);
      }
    );

    if (value === '0' || value === 0) {
      this.unitMethodHasError = true;
    } else {
      this.unitMethodHasError = false;
    }
  }

  functionMethod(value) {
    if (value === '0' || value === 0) {
      this.functionMethodHasError = true;
    } else {
      this.functionMethodHasError = false;
    }
  }

  getEntityName(value) {
    let entityName = '';
    for (let i = 0; i < this.entityDropdown.length; i++) {
      if (this.entityDropdown[i].orga_id == value) {
        entityName = this.entityDropdown[i].orga_name;
        break;
      }
    }
    return entityName;
  }

  getUnitName(value) {
    let unitName = '';
    for (let i = 0; i < this.unitDropdown.length; i++) {
      if (this.unitDropdown[i].loca_id == value) {
        unitName = this.unitDropdown[i].loca_name;
        break;
      }
    }
    return unitName;
  }
}
