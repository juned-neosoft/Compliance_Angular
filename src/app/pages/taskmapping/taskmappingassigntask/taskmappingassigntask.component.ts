import { Component, OnInit } from '@angular/core';
import { TaskmappingassigntaskService } from 'src/app/services/TaskMappingAssignTask/taskmappingassigntask.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Router } from '@angular/router';
import { Taskmappingassigntask } from 'src/app/models/TaskMappingAssignTask/taskmappingassigntask';
import { TaskmappingassigntaskAssignment } from 'src/app/models/TaskMappingAssignTask/taskmappingassigntaskAssignment';
import { CommonService } from 'src/app/services/Common/common.service';
import { Pagination } from 'src/app/models/Pagination/pagination';

@Component({
  selector: 'app-taskmappingassigntask',
  templateUrl: './taskmappingassigntask.component.html',
  styleUrls: ['./taskmappingassigntask.component.css']
})
export class TaskmappingassigntaskComponent implements OnInit {
  public getCountriesListFromAPI: any;
  public getEntityListFromAPI: any;
  public getstateListFromAPI: any;
  public getLegislationListFromAPI: any;
  public getCategoryOfLawListFromAPI: any;
  public getUnitsListFromAPI: any;
  public getRulesListFromAPI: any;
  public getAssignmentTaskListFromAPI: any;
  public taskmappingassigntaskdata = new Taskmappingassigntask();
  public taskmappingassigntaskAssignmentdata = new TaskmappingassigntaskAssignment();
  public isDisplay = false;
  public CountryHasError = true;
  public EntityHasError = true;
  public UnitHasError = true;
  public selectedRecords = [];
  public showAllchecked = false;

  public getEntityAssignmentListFromAPI: any;
  public getUnitAssignmentListFromAPI: any;
  public getFunctionsAssignmentListFromAPI: any;
  public getOwnerAssignmentListFromAPI: any;
  public getApproverAssignmentListFromAPI: any;
  public getFunctionHeadAssignmentListFromAPI: any;

  public entityAssignmentHasError = true;
  public unitAssignmentHasError = true;
  public functionsAssignmentHasError = true;
  public ownerAssignmentHasError = true;
  public approverAssignmentHasError = true;
  public functionHeadAssignmentHasError = true;

  public Pagination = new Pagination();

  constructor(
    private taskmappingassigntaskService: TaskmappingassigntaskService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private commonService: CommonService
  ) {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.getAssignmentTaskListFromAPI = [];
  }

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {

    this.spinner.show();
    this.commonService.getCountries().subscribe(
      res => {
        this.getCountriesListFromAPI = res.response.data.countries;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();
    this.commonService.getEntities().subscribe(
      res => {
        this.getEntityListFromAPI = res.response.data.entity_list;
        this.getEntityAssignmentListFromAPI = res.response.data.entity_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getEntityListFromAPI = [];
        this.getEntityAssignmentListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  chooseOption() {
    if (this.taskmappingassigntaskdata.choose == 'central') {
      this.isDisplay = true;
      this.getCategoryOfLawListFromAPI = [];
      this.spinner.show();
      this.getState();
    } else {
      this.isDisplay = false;
    }
  }

  onSubmit() {
    this.spinner.show();
    var data = {
      ChooseSOrC: this.taskmappingassigntaskdata.choose,
      cat_id: this.taskmappingassigntaskdata.categoryOdLaws,
      country_id: this.taskmappingassigntaskdata.country,
      dataRequiredFor: 'taskMapping',
      legi_id: this.taskmappingassigntaskdata.legislation,
      loca_id: this.taskmappingassigntaskdata.unit,
      orga_id: this.taskmappingassigntaskdata.entity,
      rule_id: this.taskmappingassigntaskdata.rules,
      searching_for: 'tasksmapping',
      state_id: this.taskmappingassigntaskdata.state
    };

    this.taskmappingassigntaskService.taskMappingAssignTaskSearch(data).subscribe(
      res => {
        this.getAssignmentTaskListFromAPI = [];
        this.getAssignmentTaskListFromAPI = res.response.data.task_list_to_assign.all_tasks;
        this.Pagination.TotalRecords = this.getAssignmentTaskListFromAPI.length;
        this.spinner.hide();
      },
      err => {
        this.getAssignmentTaskListFromAPI = [];
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
        this.spinner.hide();
      }
    );
  }

  onSubmitAssign() {
    var task_List = [];
    var loca_list = [];
    var dept_list = [];
    var orga_list = [];

    for (let i = 0; i < this.selectedRecords.length; i++) {
      for (let j = 0; j < this.getAssignmentTaskListFromAPI.length; j++) {
        if (this.selectedRecords[i] == parseInt(this.getAssignmentTaskListFromAPI[j].task_id)) {
          task_List.push({
            'tmap_task_id': parseInt(this.getAssignmentTaskListFromAPI[j].task_id),
            'tmap_lexcare_task_id': this.getAssignmentTaskListFromAPI[j].lexcare_task_id
          });
        }
      }
    }

    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.functions.length; i++) {
      console.log("Function List=" + parseInt(this.taskmappingassigntaskAssignmentdata.functions[i].toString()));
      dept_list.push({
        'tmap_dept_id': parseInt(this.taskmappingassigntaskAssignmentdata.functions[i].toString())
      });
    }

    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.entity.length; i++) {
      orga_list.push({
        'tmap_orga_id': parseInt(this.taskmappingassigntaskAssignmentdata.entity[i].toString())
      });
    }


    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.unit.length; i++) {
      loca_list.push({
        'tmap_loca_id': parseInt(this.taskmappingassigntaskAssignmentdata.unit[i].toString())
      });
    }

    var data = {
      "dept_list": dept_list,
      "orga_list": orga_list,
      "pr_user_id": parseInt(this.taskmappingassigntaskAssignmentdata.owner.toString()),
      "rw_user_id": parseInt(this.taskmappingassigntaskAssignmentdata.approver.toString()),
      "fh_user_id": parseInt(this.taskmappingassigntaskAssignmentdata.functionHead.toString()),
      "tasks_list": task_List,
      "loca_list": loca_list
    };

    this.spinner.show();
    this.taskmappingassigntaskService.savetasksusermapping(data).subscribe(
      res => {
        if (res.response.status == 'Success') {
          this.alertify.success(`Task assign successfully.`);
          setTimeout(location.reload.bind(location), 1000);
          // this.router.navigate(['task-mapping']);
        }
        else {
          this.alertify.error(`Task not assign successfully.`);
        }

        this.spinner.hide();
      },
      err => {
        this.alertify.error(`Data not found`);
      }
    );
  }

  getState() {
    this.spinner.show();
    this.commonService.getState(this.taskmappingassigntaskdata.country).subscribe(
      res => {
        this.getstateListFromAPI = [];
        this.getstateListFromAPI = res.response.data.state_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getstateListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  getLegislationAndCategoryOfLaw() {
    this.spinner.show();
    this.commonService.getLegislation(this.getData()).subscribe(
      res => {
        this.getLegislationListFromAPI = [];
        this.getLegislationListFromAPI = res.response.data.legi_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getLegislationListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();
    this.commonService.getCategoryOfLaw(this.getData()).subscribe(
      res => {
        this.getCategoryOfLawListFromAPI = [];
        this.getCategoryOfLawListFromAPI = res.response.data.cat_law_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getCategoryOfLawListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    if (this.taskmappingassigntaskdata.country != 0) {
      this.getState();
    }
  }

  getLegislation() {

    this.spinner.show();
    this.commonService.getLegislation(this.getData()).subscribe(
      res => {
        this.getLegislationListFromAPI = [];
        this.getLegislationListFromAPI = res.response.data.legi_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getLegislationListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  getRules() {

    this.spinner.show();
    this.commonService.getRules(this.getData()).subscribe(
      res => {
        this.getRulesListFromAPI = [];
        this.getRulesListFromAPI = res.response.data.legi_rule_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getRulesListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  getUnits() {
    this.spinner.show();
    this.commonService.getUnits(this.taskmappingassigntaskdata.entity).subscribe(
      res => {
        this.getUnitsListFromAPI = [];
        this.getUnitsListFromAPI = res.response.data.unit_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getUnitsListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  ValidateCountry(value) {
    this.getLegislationAndCategoryOfLaw();
    if (value === '0' || value === 0) {
      this.CountryHasError = true;
    } else {
      this.CountryHasError = false;
    }
  }

  ValidateState() {
    this.getLegislationAndCategoryOfLaw();
  }

  ValidateCategoryOfLaw(value) {
    this.getLegislation();
  }

  ValidateLegislation(value) {
    this.getRules();
  }

  ValidateEntity(value) {
    this.getUnits();

    if (value === '0' || value === 0) {
      this.EntityHasError = true;
    } else {
      this.EntityHasError = false;
    }
  }

  ValidateUnit(value) {
    if (value === '0' || value === 0) {
      this.UnitHasError = true;
    } else {
      this.UnitHasError = false;
    }
  }

  getData() {
    const data = {
      ChooseSOrC: this.taskmappingassigntaskdata.choose,
      cat_id: this.taskmappingassigntaskdata.categoryOdLaws,
      country_id: this.taskmappingassigntaskdata.country.toString(),
      dataRequiredFor: "tasksmapping",
      searching_for: "tasksmapping",
      state_id: this.taskmappingassigntaskdata.state == 0 ? 2 : this.taskmappingassigntaskdata.state,
      legi_id: this.taskmappingassigntaskdata.legislation
    };

    return data;
  }

  // Assignment Section

  ValidateEntityAssignment(value) {
    this.spinner.show();
    this.commonService.getUnits(this.taskmappingassigntaskAssignmentdata.entity).subscribe(
      res => {
        this.getUnitAssignmentListFromAPI = [];
        this.getFunctionsAssignmentListFromAPI = [];
        this.getUnitAssignmentListFromAPI = res.response.data.unit_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getUnitAssignmentListFromAPI = [];
        this.getFunctionsAssignmentListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    if (value === '0' || value === 0) {
      this.entityAssignmentHasError = true;
    } else {
      this.entityAssignmentHasError = false;
    }
  }

  ValidateUnitAssignment(value) {
    this.spinner.show();
    // this.commonService.getFunction(this.taskmappingassigntaskAssignmentdata.unit).subscribe(
    //   res => {
    //     this.getFunctionsAssignmentListFromAPI = [];
    //     this.getFunctionsAssignmentListFromAPI = res.response.data.function_list;
    //     this.spinner.hide();
    //   },
    //   err => {
    //     this.spinner.hide();
    //     this.getFunctionsAssignmentListFromAPI = [];
    //     this.alertify.error(`Data not found`);
    //   }
    // );

    var rowData = [];
    var orga_list = [];
    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.unit.length; i++) {
      rowData.push({ tmap_loca_id: parseInt(this.taskmappingassigntaskAssignmentdata.unit[i]) });

    }

    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.entity.length; i++) {
      orga_list.push({
        'tmap_orga_id': parseInt(this.taskmappingassigntaskAssignmentdata.entity[i].toString())
      });
    }




    var data = {
      "orga_list": orga_list,
      "loca_list": rowData
    }
    this.commonService.getFunctionMultiList(data).subscribe(
      res => {
        this.taskmappingassigntaskAssignmentdata.functions = [];
        this.getFunctionsAssignmentListFromAPI = [];
        this.getFunctionsAssignmentListFromAPI = res.response.data.function_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getFunctionsAssignmentListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    if (value == [] || value == null) {
      this.unitAssignmentHasError = true;
    } else {
      this.unitAssignmentHasError = false;
    }
  }

  ValidateFunctionsAssignment(value) {
    this.spinner.show()
    var rowData = [];
    var dept_list = [];
    var orga_list = [];

    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.unit.length; i++) {
      rowData.push({ tmap_loca_id: parseInt(this.taskmappingassigntaskAssignmentdata.unit[i]) });

    }

    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.functions.length; i++) {
      console.log("Function List=" + parseInt(this.taskmappingassigntaskAssignmentdata.functions[i].toString()));
      dept_list.push({
        'tmap_dept_id': parseInt(this.taskmappingassigntaskAssignmentdata.functions[i].toString())
      });
    }

    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.entity.length; i++) {
      orga_list.push({
        'tmap_orga_id': parseInt(this.taskmappingassigntaskAssignmentdata.entity[i].toString())
      });
    }



    var data = {
      "orga_list": orga_list,
      "dept_list": dept_list,
      "loca_list": rowData
    }
    this.commonService.getOwnerExecutorList(data).subscribe(
      res => {
        this.getOwnerAssignmentListFromAPI = [];
        this.getOwnerAssignmentListFromAPI = res.response.data.executor_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getOwnerAssignmentListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    if (value === '0' || value === 0) {
      this.functionsAssignmentHasError = true;
    } else {
      this.functionsAssignmentHasError = false;
    }

  }

  ValidateOwnerAssignment(value) {
    this.spinner.show()
    var rowData = [];
    var dept_list = [];
    var orga_list = [];
    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.unit.length; i++) {
      rowData.push({ tmap_loca_id: parseInt(this.taskmappingassigntaskAssignmentdata.unit[i]) });

    }

    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.functions.length; i++) {
      console.log("Function List=" + parseInt(this.taskmappingassigntaskAssignmentdata.functions[i].toString()));
      dept_list.push({
        'tmap_dept_id': parseInt(this.taskmappingassigntaskAssignmentdata.functions[i].toString())
      });
    }

    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.entity.length; i++) {
      orga_list.push({
        'tmap_orga_id': parseInt(this.taskmappingassigntaskAssignmentdata.entity[i].toString())
      });
    }


    var data = {
      "orga_list": orga_list,
      "dept_list": dept_list,
      "loca_list": rowData
    }
    this.commonService.getApproverEvaluatorList(data).subscribe(
      res => {
        this.getApproverAssignmentListFromAPI = [];
        this.getApproverAssignmentListFromAPI = res.response.data.evaluator_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getApproverAssignmentListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    if (value === '0' || value === 0) {
      this.ownerAssignmentHasError = true;
    } else {
      this.ownerAssignmentHasError = false;
    }
  }

  ValidateApproverAssignment(value) {
    this.spinner.show()
    var rowData = [];
    var dept_list = [];
    var orga_list = [];
    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.unit.length; i++) {
      rowData.push({ tmap_loca_id: parseInt(this.taskmappingassigntaskAssignmentdata.unit[i]) });

    }

    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.functions.length; i++) {
      console.log("Function List=" + parseInt(this.taskmappingassigntaskAssignmentdata.functions[i].toString()));
      dept_list.push({
        'tmap_dept_id': parseInt(this.taskmappingassigntaskAssignmentdata.functions[i].toString())
      });
    }

    for (let i = 0; i < this.taskmappingassigntaskAssignmentdata.entity.length; i++) {
      orga_list.push({
        'tmap_orga_id': parseInt(this.taskmappingassigntaskAssignmentdata.entity[i].toString())
      });
    }


    var data = {
      "orga_list": orga_list,
      "dept_list": dept_list,
      "loca_list": rowData
    }

    this.commonService.getFunctionHeadList(data).subscribe(
      res => {
        this.getFunctionHeadAssignmentListFromAPI = [];
        this.getFunctionHeadAssignmentListFromAPI = res.response.data.function_head_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getFunctionHeadAssignmentListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    if (value === '0' || value === 0) {
      this.approverAssignmentHasError = true;
    } else {
      this.approverAssignmentHasError = false;
    }
  }

  ValidateFunctionHeadAssignment(value) {
    if (value === '0' || value === 0) {
      this.functionHeadAssignmentHasError = true;
    } else {
      this.functionHeadAssignmentHasError = false;
    }
  }

  checkFunction(value) {
    var isExists = false;
    for (let i = 0; i < this.selectedRecords.length; i++) {
      if (this.selectedRecords[i] == parseInt(value)) {
        isExists = true;
        break;
      }
    }

    if (isExists) {
      const index = this.selectedRecords.indexOf(parseInt(value), 0);
      if (index > -1) {
        this.selectedRecords.splice(index, 1);
      }
    }
    else {
      this.selectedRecords.push(parseInt(value));
    }
  }

  checkAllFunction() {
    this.showAllchecked = this.showAllchecked == true ? false : true;
    if (this.showAllchecked == true) {
      this.selectedRecords = [];
      for (let i = 0; i < this.getAssignmentTaskListFromAPI.length; i++) {
        this.selectedRecords.push(parseInt(this.getAssignmentTaskListFromAPI[i].task_id));
      }
    }
    else {
      this.selectedRecords = [];
    }
  }

}
