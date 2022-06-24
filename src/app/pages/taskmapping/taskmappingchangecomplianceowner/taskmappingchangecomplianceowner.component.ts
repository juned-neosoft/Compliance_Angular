import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/Common/common.service';
import { TaskmappingchangecomplianceownerService } from 'src/app/services/TaskMappingChangeComplianceowner/taskmappingchangecomplianceowner.service';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Taskmappingchangecomplianceownerassign } from 'src/app/models/TaskMappingChangeComplianceowner/taskmappingchangecomplianceownerassign';
import { Taskmappingchangecomplianceownerfilter } from 'src/app/models/TaskMappingChangeComplianceowner/taskmappingchangecomplianceownerfilter';

@Component({
  selector: 'app-taskmappingchangecomplianceowner',
  templateUrl: './taskmappingchangecomplianceowner.component.html',
  styleUrls: ['./taskmappingchangecomplianceowner.component.css']
})
export class TaskmappingchangecomplianceownerComponent implements OnInit {
  public Pagination = new Pagination();
  public changeComplianceOwnerAssign = new Taskmappingchangecomplianceownerassign();
  public changeComplianceOwnerFilter = new Taskmappingchangecomplianceownerfilter();
  public showAllchecked = false;

  public getEntityListFilterFromAPI: any;
  public getUnitListFilterFromAPI: any;
  public getFunctionListFilterFromAPI: any;
  public getOwnerListFilterFromAPI: any;
  public getApproverListFilterFromAPI: any;
  public getFunctionHeadListFilterFromAPI: any;
  public getLegislationListFilterFromAPI: any;
  public getRulesListFilterFromAPI: any;
  public TaskForChangeComplianceOwnerPageLegislation: any;
  public TaskForChangeComplianceOwnerPageRules: any;

  public entityFilterHasError = true;
  public unitFilterHasError = true;
  public functionFilterHasError = true;
  public ownerFilterHasError = true;
  public approverFilterHasError = true;
  public functionHeadFilterHasError = true;
  public legislationFilterHasError = true;
  public rulesFilterHasError = true;

  public getEntityListAssignFromAPI: any;
  public getUnitListAssignFromAPI: any;
  public getFunctionListAssignFromAPI: any;
  public getOwnerListAssignFromAPI: any;
  public getApproverListAssignFromAPI: any;
  public getFunctionHeadListAssignFromAPI: any;

  public entityAssignHasError = true;
  public unitAssignHasError = true;
  public functionAssignHasError = true;
  public ownerAssignHasError = true;
  public approverAssignHasError = true;
  public functionHeadAssignHasError = true;

  public responseData: any;
  public selectedRecords = [];

  constructor(
    private commonService: CommonService,
    private taskmappingchangecomplianceownerService: TaskmappingchangecomplianceownerService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.responseData = [];
    this.onLoad();
  }

  onLoad() {
    this.spinner.show();
    this.commonService.getEntities().subscribe(
      res => {
        this.spinner.hide();
        this.getEntityListFilterFromAPI = res.response.data.entity_list;
        this.getEntityListAssignFromAPI = res.response.data.entity_list;
      },
      err => {
        this.spinner.hide();
        this.getEntityListFilterFromAPI = [];
        this.getEntityListAssignFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();
    this.commonService.TaskForChangeComplianceOwnerPage({}).subscribe(
      res => {
        this.spinner.hide();
        this.TaskForChangeComplianceOwnerPageLegislation = res.response.data.mapped_data_list.Filters[0].Legislations;
        this.TaskForChangeComplianceOwnerPageRules = res.response.data.mapped_data_list.Filters[0].Rules;
      },
      err => {
        this.spinner.hide();
        this.TaskForChangeComplianceOwnerPageLegislation = [];
        this.TaskForChangeComplianceOwnerPageRules = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  onSearch() {
    this.spinner.show();
    var data = {
      tasks_list: [],
      dataRequiredFor: 'taskEnabling',
      tmap_orga_id: 0,
      tmap_loca_id: 0,
      tmap_dept_id: 0,
      tmap_pr_user_id: 0,
      tmap_rw_user_id: 0,
      tmap_fh_user_id: 0,
      orga_id: parseInt(this.changeComplianceOwnerFilter.entityFilter.toString()),
      loca_id: parseInt(this.changeComplianceOwnerFilter.unitFilter.toString()),
      dept_id: parseInt(this.changeComplianceOwnerFilter.functionFilter.toString()),
      pr_user_id: parseInt(this.changeComplianceOwnerFilter.ownerFilter.toString()),
      rw_user_id: parseInt(this.changeComplianceOwnerFilter.approverFilter.toString()),
      fh_user_id: parseInt(this.changeComplianceOwnerFilter.functionHeadFilter.toString()),
      legi_id: parseInt(this.changeComplianceOwnerFilter.legislationFilter.toString()),
      rule_id: parseInt(this.changeComplianceOwnerFilter.rulesFilter.toString())
    };

    this.taskmappingchangecomplianceownerService.SearchComplianceOwnerPage(data).subscribe(
      res => {
        this.spinner.hide();
        this.responseData = res.response.data.repoData;
        this.Pagination.TotalRecords = this.responseData.length;
        this.selectedRecords = [];
      },
      err => {
        this.spinner.hide();
        this.responseData = [];
        this.selectedRecords = [];
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );
  }

  onAssign() {
    this.spinner.show();

    // var Task_List = [];
    // for (let i = 0; i < this.selectedRecords.length; i++) {
    //   for (let j = 0; j < this.responseData.length; j++) {
    //     if (this.selectedRecords[i] == parseInt(this.responseData[j].tmap_id)) {
    //       Task_List.push({
    //         'tmap_task_id': parseInt(this.responseData[j].tmap_id),
    //         'tmap_lexcare_task_id': this.responseData[j].task_lexcare_id
    //       });
    //     }
    //   }
    // }

    var Task_List = [];
    for (let i = 0; i < this.selectedRecords.length; i++) {
      for (let j = 0; j < this.responseData.length; j++) {
        if (this.selectedRecords[i] == parseInt(this.responseData[j].tmap_id)) {
          Task_List.push({
            'tmap_id': parseInt(this.responseData[j].tmap_id)
          });
        }
      }
    }

    // var data = {
    //   dept_id: parseInt(this.changeComplianceOwnerAssign.functionAssign.toString()),
    //   orga_id: parseInt(this.changeComplianceOwnerAssign.entityAssign.toString()),
    //   pr_user_id: parseInt(this.changeComplianceOwnerAssign.ownerAssign.toString()),
    //   rw_user_id: parseInt(this.changeComplianceOwnerAssign.approverAssign.toString()),
    //   fh_user_id: parseInt(this.changeComplianceOwnerAssign.functionHeadAssign.toString()),
    //   tasks_list: Task_List,
    //   loca_list: [{
    //     tmap_loca_id: parseInt(this.changeComplianceOwnerAssign.unitAssign.toString())
    //   }]
    // };

    var data = {
      "orga_id": parseInt(this.changeComplianceOwnerAssign.entityAssign.toString()),
      "loca_id": parseInt(this.changeComplianceOwnerAssign.unitAssign.toString()),
      "dept_id": parseInt(this.changeComplianceOwnerAssign.functionAssign.toString()),
      "pr_user_id": parseInt(this.changeComplianceOwnerAssign.ownerAssign.toString()),
      "rw_user_id": parseInt(this.changeComplianceOwnerAssign.approverAssign.toString()),
      "fh_user_id": parseInt(this.changeComplianceOwnerAssign.functionHeadAssign.toString()),
      "tasks_list": Task_List
    }

    this.taskmappingchangecomplianceownerService.ChangeComplianceOwner(data).subscribe(
      res => {
        this.spinner.hide();
        if (res.response.status == 'Success') {
          this.alertify.success(`Task assign successfully.`);
          this.router.navigate(['task-mapping']);
        }
        else {
          this.alertify.error(`Task not assign successfully.`);
        }
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );
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
    } else {
      this.selectedRecords.push(parseInt(value));
    }
  }

  ValidateEntityFilter(value) {
    if (value === '0' || value === 0) {
      this.entityFilterHasError = true;
    } else {
      this.entityFilterHasError = false;
      this.changeComplianceOwnerFilter.unitFilter = 0;
      this.changeComplianceOwnerFilter.functionFilter = 0;
      this.spinner.show();
      this.commonService.getUnits(this.changeComplianceOwnerFilter.entityFilter).subscribe(
        res => {
          this.spinner.hide();
          this.getUnitListFilterFromAPI = res.response.data.unit_list;
          this.getLegislation();
        },
        err => {
          this.spinner.hide();
          this.getUnitListFilterFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );
    }
  }
  ValidateUnitFilter(value) {
    if (value === '0' || value === 0) {
      this.getFunctionListFilterFromAPI = [];
      this.unitFilterHasError = true;
    } else {
      this.unitFilterHasError = false;
      this.changeComplianceOwnerFilter.functionFilter = 0;
      this.spinner.show();
      this.commonService.getFunction(this.changeComplianceOwnerFilter.unitFilter).subscribe(
        res => {
          this.spinner.hide();
          this.getFunctionListFilterFromAPI = res.response.data.function_list;
          this.getLegislation();
        },
        err => {
          this.spinner.hide();
          this.getFunctionListFilterFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );
    }
  }
  ValidateFunctionFilter(value) {
    if (value === '0' || value === 0) {
      this.functionFilterHasError = true;
    } else {
      this.getLegislation();
      this.spinner.show();
      const data = {
        dept_id: parseInt(this.changeComplianceOwnerFilter.functionFilter.toString()),
        loca_id: parseInt(this.changeComplianceOwnerFilter.unitFilter.toString()),
        orga_id: parseInt(this.changeComplianceOwnerFilter.entityFilter.toString())
      };

      this.changeComplianceOwnerFilter.ownerFilter = 0;
      this.changeComplianceOwnerFilter.approverFilter = 0;
      this.changeComplianceOwnerFilter.functionHeadFilter = 0;
      this.getOwnerListFilterFromAPI = [];
      this.getApproverListFilterFromAPI = [];
      this.getFunctionHeadListFilterFromAPI = [];

      this.commonService.GetExeListForChangeOwner(data).subscribe(
        res => {
          this.spinner.hide();
          this.getOwnerListFilterFromAPI = res.response.data.Executor;
        },
        err => {
          this.spinner.hide();
          this.getOwnerListFilterFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );
      this.functionFilterHasError = false;
    }
  }
  ValidateOwnerFilter(value) {
    if (value === '0' || value === 0) {
      this.ownerFilterHasError = true;
    } else {
      this.spinner.show();
      const data = {
        dept_id: parseInt(this.changeComplianceOwnerFilter.functionFilter.toString()),
        loca_id: parseInt(this.changeComplianceOwnerFilter.unitFilter.toString()),
        orga_id: parseInt(this.changeComplianceOwnerFilter.entityFilter.toString())
      };

      this.changeComplianceOwnerFilter.approverFilter = 0;
      this.changeComplianceOwnerFilter.functionHeadFilter = 0;
      this.getApproverListFilterFromAPI = [];
      this.getFunctionHeadListFilterFromAPI = [];
      this.commonService.GetEvalListForChangeOwner(data).subscribe(
        res => {
          this.spinner.hide();
          this.getApproverListFilterFromAPI = res.response.data.Evaluator;
        },
        err => {
          this.spinner.hide();
          this.getApproverListFilterFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );

      this.ownerFilterHasError = false;
    }
  }
  ValidateApproverFilter(value) {
    if (value === '0' || value === 0) {
      this.approverFilterHasError = true;
    } else {
      this.spinner.show();
      const data = {
        dept_id: parseInt(this.changeComplianceOwnerFilter.functionFilter.toString()),
        loca_id: parseInt(this.changeComplianceOwnerFilter.unitFilter.toString()),
        orga_id: parseInt(this.changeComplianceOwnerFilter.entityFilter.toString())
      };

      this.changeComplianceOwnerFilter.functionHeadFilter = 0;
      this.getFunctionHeadListFilterFromAPI = []
      this.commonService.GetFunHeadListForChangeOwner(data).subscribe(
        res => {
          this.spinner.hide();
          this.getFunctionHeadListFilterFromAPI = res.response.data.Function_Head;
        },
        err => {
          this.spinner.hide();
          this.getFunctionHeadListFilterFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );

      this.approverFilterHasError = false;
    }
  }
  ValidateFunctionHeadFilter(value) {
    if (value === '0' || value === 0) {
      this.functionHeadFilterHasError = true;
    } else {
      this.functionHeadFilterHasError = false;
    }
  }
  ValidateLegislationFilter(value) {
    this.changeComplianceOwnerFilter.rulesFilter = 0;
    this.getRulesListFilterFromAPI = [];
    if (value === '0' || value === 0) {
      this.legislationFilterHasError = true;
    } else {

      for (let i = 0; i < this.TaskForChangeComplianceOwnerPageRules.length; i++) {
        if (this.TaskForChangeComplianceOwnerPageRules[i].task_legi_id == this.changeComplianceOwnerFilter.legislationFilter) {
          this.getRulesListFilterFromAPI.push(this.TaskForChangeComplianceOwnerPageRules[i]);
        }
      }
      this.legislationFilterHasError = false;
    }
  }
  ValidateRulesFilter(value) {
    if (value === '0' || value === 0) {
      this.rulesFilterHasError = true;
    } else {
      this.rulesFilterHasError = false;
    }
  }

  getLegislation() {
    this.changeComplianceOwnerFilter.legislationFilter = 0;
    this.changeComplianceOwnerFilter.rulesFilter = 0;
    this.getRulesListFilterFromAPI = [];
    this.getLegislationListFilterFromAPI = [];
    if (this.changeComplianceOwnerFilter.entityFilter != 0 && this.changeComplianceOwnerFilter.unitFilter != 0 && this.changeComplianceOwnerFilter.functionFilter != 0) {
      for (let i = 0; i < this.TaskForChangeComplianceOwnerPageLegislation.length; i++) {
        if (this.changeComplianceOwnerFilter.entityFilter == this.TaskForChangeComplianceOwnerPageLegislation[i].orga_id &&
          this.changeComplianceOwnerFilter.unitFilter == this.TaskForChangeComplianceOwnerPageLegislation[i].loca_id &&
          this.changeComplianceOwnerFilter.functionFilter == this.TaskForChangeComplianceOwnerPageLegislation[i].dept_id) {
          this.getLegislationListFilterFromAPI.push(this.TaskForChangeComplianceOwnerPageLegislation[i]);
        }
      }
    } else if (this.changeComplianceOwnerFilter.entityFilter != 0 && this.changeComplianceOwnerFilter.unitFilter != 0) {
      for (let i = 0; i < this.TaskForChangeComplianceOwnerPageLegislation.length; i++) {
        if (this.changeComplianceOwnerFilter.entityFilter == this.TaskForChangeComplianceOwnerPageLegislation[i].orga_id &&
          this.changeComplianceOwnerFilter.unitFilter == this.TaskForChangeComplianceOwnerPageLegislation[i].loca_id) {
          this.getLegislationListFilterFromAPI.push(this.TaskForChangeComplianceOwnerPageLegislation[i]);
        }
      }
    } else if (this.changeComplianceOwnerFilter.entityFilter != 0) {
      for (let i = 0; i < this.TaskForChangeComplianceOwnerPageLegislation.length; i++) {
        if (this.changeComplianceOwnerFilter.entityFilter == this.TaskForChangeComplianceOwnerPageLegislation[i].orga_id) {
          this.getLegislationListFilterFromAPI.push(this.TaskForChangeComplianceOwnerPageLegislation[i]);
        }
      }
    }
  }

  ValidateEntityAssign(value) {
    if (value === '0' || value === 0) {
      this.entityAssignHasError = true;
    } else {
      this.entityAssignHasError = false;
      this.changeComplianceOwnerAssign.unitAssign = 0;
      this.changeComplianceOwnerAssign.functionAssign = 0;
      this.changeComplianceOwnerAssign.ownerAssign = 0;
      this.changeComplianceOwnerAssign.approverAssign = 0;
      this.changeComplianceOwnerAssign.functionHeadAssign = 0;
      this.getUnitListAssignFromAPI = [];
      this.getFunctionListAssignFromAPI = [];
      this.getOwnerListAssignFromAPI = [];
      this.getApproverListAssignFromAPI = [];
      this.getFunctionHeadListAssignFromAPI = [];
      this.spinner.show();
      this.commonService.getUnits(this.changeComplianceOwnerAssign.entityAssign).subscribe(
        res => {
          this.spinner.hide();
          this.getUnitListAssignFromAPI = res.response.data.unit_list;
          this.getLegislation();
        },
        err => {
          this.spinner.hide();
          this.getUnitListAssignFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );
    }
  }

  ValidateUnitAssign(value) {
    if (value === '0' || value === 0) {
      this.unitAssignHasError = true;
    } else {
      this.unitAssignHasError = false;
      this.changeComplianceOwnerAssign.functionAssign = 0;
      this.changeComplianceOwnerAssign.ownerAssign = 0;
      this.changeComplianceOwnerAssign.approverAssign = 0;
      this.changeComplianceOwnerAssign.functionHeadAssign = 0;
      this.getFunctionListAssignFromAPI = [];
      this.getOwnerListAssignFromAPI = [];
      this.getApproverListAssignFromAPI = [];
      this.getFunctionHeadListAssignFromAPI = [];
      this.spinner.show();
      this.commonService.getFunction(this.changeComplianceOwnerAssign.unitAssign).subscribe(
        res => {
          this.spinner.hide();
          this.getFunctionListAssignFromAPI = res.response.data.function_list;
          this.getLegislation();
        },
        err => {
          this.spinner.hide();
          this.getFunctionListAssignFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );
    }
  }

  ValidateFunctionAssign(value) {
    if (value === '0' || value === 0) {
      this.functionAssignHasError = true;
    } else {
      this.functionAssignHasError = false;

      this.spinner.show();
      const data = {
        dept_id: parseInt(this.changeComplianceOwnerAssign.functionAssign.toString()),
        loca_id: parseInt(this.changeComplianceOwnerAssign.unitAssign.toString()),
        orga_id: parseInt(this.changeComplianceOwnerAssign.entityAssign.toString())
      };
      this.changeComplianceOwnerAssign.ownerAssign = 0;
      this.changeComplianceOwnerAssign.approverAssign = 0;
      this.changeComplianceOwnerAssign.functionHeadAssign = 0;
      this.getOwnerListAssignFromAPI = [];
      this.getApproverListAssignFromAPI = [];
      this.getFunctionHeadListAssignFromAPI = [];
      this.commonService.GetExeListForChangeOwner(data).subscribe(
        res => {
          this.spinner.hide();
          this.getOwnerListAssignFromAPI = res.response.data.Executor;
        },
        err => {
          this.spinner.hide();
          this.getOwnerListAssignFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );
    }
  }

  ValidateOwnerAssign(value) {
    if (value === '0' || value === 0) {
      this.ownerAssignHasError = true;
    } else {
      this.ownerAssignHasError = false;

      this.spinner.show();
      const data = {
        dept_id: parseInt(this.changeComplianceOwnerAssign.functionAssign.toString()),
        loca_id: parseInt(this.changeComplianceOwnerAssign.unitAssign.toString()),
        orga_id: parseInt(this.changeComplianceOwnerAssign.entityAssign.toString())
      };
      this.changeComplianceOwnerAssign.approverAssign = 0;
      this.changeComplianceOwnerAssign.functionHeadAssign = 0;
      this.getApproverListAssignFromAPI = [];
      this.getFunctionHeadListAssignFromAPI = [];
      this.commonService.GetEvalListForChangeOwner(data).subscribe(
        res => {
          this.spinner.hide();
          this.getApproverListAssignFromAPI = res.response.data.Evaluator;
        },
        err => {
          this.spinner.hide();
          this.getApproverListAssignFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );
    }
  }

  ValidateApproverAssign(value) {
    if (value === '0' || value === 0) {
      this.approverAssignHasError = true;
    } else {
      this.approverAssignHasError = false;

      this.spinner.show();
      const data = {
        dept_id: parseInt(this.changeComplianceOwnerAssign.functionAssign.toString()),
        loca_id: parseInt(this.changeComplianceOwnerAssign.unitAssign.toString()),
        orga_id: parseInt(this.changeComplianceOwnerAssign.entityAssign.toString())
      };
      this.changeComplianceOwnerAssign.functionHeadAssign = 0;
      this.getFunctionHeadListAssignFromAPI = [];
      this.commonService.GetFunHeadListForChangeOwner(data).subscribe(
        res => {
          this.spinner.hide();
          this.getFunctionHeadListAssignFromAPI = res.response.data.Function_Head;
        },
        err => {
          this.spinner.hide();
          this.getFunctionHeadListAssignFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );
    }
  }

  ValidateFunctionHeadAssign(value) {
    if (value === '0' || value === 0) {
      this.functionHeadAssignHasError = true;
    } else {
      this.functionHeadAssignHasError = false;
    }
  }

  checkAllFunction() {
    this.showAllchecked = this.showAllchecked == true ? false : true;
    if (this.showAllchecked == true) {
      this.selectedRecords = [];
      for (let i = 0; i < this.responseData.length; i++) {
        this.selectedRecords.push(parseInt(this.responseData[i].tmap_id));
      }
    }
    else {
      this.selectedRecords = [];
    }
  }
}
