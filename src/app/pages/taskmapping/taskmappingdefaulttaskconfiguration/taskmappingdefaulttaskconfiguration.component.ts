import { Component, OnInit } from '@angular/core';
import { TaskmappingtaskconfigurationService } from 'src/app/services/TaskMappingTaskConfiguration/taskmappingtaskconfiguration.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Router } from '@angular/router';
import { Taskmappingtaskconfiguration, SaveConfigurationModel } from 'src/app/models/TaskMappingTaskConfiguration/taskmappingtaskconfiguration';
import { CommonService } from 'src/app/services/Common/common.service';
import { Pagination } from 'src/app/models/Pagination/pagination';


@Component({
  selector: 'app-taskmappingdefaulttaskconfiguration',
  templateUrl: './taskmappingdefaulttaskconfiguration.component.html',
  styleUrls: ['./taskmappingdefaulttaskconfiguration.component.css']
})
export class TaskmappingdefaulttaskconfigurationComponent implements OnInit {

  public Pagination = new Pagination();
  public taskmappingtaskconfiguration = new Taskmappingtaskconfiguration();
  public saveConfigurationModel = new SaveConfigurationModel();
  public getCountriesListFromAPI: any;
  public getLegislationListFromAPI: any;
  public getCategoryOfLawListFromAPI: any;
  public getstateListFromAPI: any;
  public getEntityListFilterFromAPI: any;
  public getRulesListFromAPI: any;
  public getApproverListFilterFromAPI: any;
  public getOwnerListFilterFromAPI: any;
  public getFunctionListFilterFromAPI: any;
  public getUnitListFilterFromAPI: any;
  public getFrequencyListFilterFromAPI: any;
 


  public isDisplay = false;
  public CountryHasError = true;
  public ownerFilterHasError = true;
  public functionFilterHasError = true;
  public unitFilterHasError = true;
  public entityFilterHasError = true;

  public responseData: any;
  public selectedRecords = [];
  public ImpactOnEntity = ['Severe', 'Major', 'Moderate', 'Low'];
  public ImpactOnUnit = [];
  public Impact = [];


  constructor(
    private taskmappingtaskconfigurationService: TaskmappingtaskconfigurationService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private commonService: CommonService
  ) { 
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
  }

  ngOnInit() {
    this.responseData = [];

    this.saveConfigurationModel.legalDueDate = this.getTodaysDate();
    this.saveConfigurationModel.unitHeadDueDate = this.getTodaysDate();
    this.saveConfigurationModel.functionHeadDueDate = this.getTodaysDate();
    this.saveConfigurationModel.approverDueDate = this.getTodaysDate();
    this.saveConfigurationModel.ownerDueDate = this.getTodaysDate();
    this.saveConfigurationModel.firstAlert = this.getTodaysDate();
    this.saveConfigurationModel.secondAlert = this.getTodaysDate();
    this.saveConfigurationModel.thirdAlert = this.getTodaysDate();

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
        this.getEntityListFilterFromAPI = res.response.data.entity_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getEntityListFilterFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();
    this.commonService.GetFrequencyList().subscribe(
      res => {
        this.getFrequencyListFilterFromAPI = res.response.data;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getFrequencyListFilterFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  onSearch() {
    this.spinner.show();
    var data = {
      cat_id: parseInt(this.taskmappingtaskconfiguration.categoryOdLaws.toString()),
      country_id: parseInt(this.taskmappingtaskconfiguration.country.toString()),
      dept_id: parseInt(this.taskmappingtaskconfiguration.functions.toString()),
      evaluator: parseInt(this.taskmappingtaskconfiguration.approver.toString()),
      executor: parseInt(this.taskmappingtaskconfiguration.owner.toString()),
      frequency: this.taskmappingtaskconfiguration.frequency == '' ? "NA" : this.taskmappingtaskconfiguration.frequency,
      legi_id: parseInt(this.taskmappingtaskconfiguration.legislation.toString()),
      loca_list: parseInt(this.taskmappingtaskconfiguration.unit.toString()) == 0 ? [] : [{ loca_id: parseInt(this.taskmappingtaskconfiguration.unit.toString()) }],
      orga_id: parseInt(this.taskmappingtaskconfiguration.entity.toString()),
      event: parseInt(this.taskmappingtaskconfiguration.event.toString()),
      rule_id: parseInt(this.taskmappingtaskconfiguration.rules.toString()),
      sub_event: parseInt(this.taskmappingtaskconfiguration.sub_event.toString()),
      searching_for: "defaultconfiguration",
      state_id: parseInt(this.taskmappingtaskconfiguration.state.toString()) == 0 ? 2 : parseInt(this.taskmappingtaskconfiguration.state.toString())
    };

    // ChooseSOrC: "central"
    // sub_event: "NA"

    this.responseData = [];
    this.Pagination.TotalRecords = 0;
    this.taskmappingtaskconfigurationService.getTaskListForDefaultTaskConfiguration(data).subscribe(
      res => {
        this.responseData = res.response.data;
        this.Pagination.TotalRecords = this.responseData.length;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.responseData = [];
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );
  }

  convertDateForAPI(getDate) {
    var getDateNew = getDate.split('-');
    return `${getDateNew[2]}-${getDateNew[1]}-${getDateNew[0]}`
  }

  checkFunction(value) {
    var isExists = false;
    for (let i = 0; i < this.selectedRecords.length; i++) {
      if (this.selectedRecords[i] == value) {
        isExists = true;
        break;
      }
    }

    if (isExists) {
      const index = this.selectedRecords.indexOf(value, 0);
      if (index > -1) {
        this.selectedRecords.splice(index, 1);
      }
    } else {
      this.selectedRecords.push(value);
    }
  }

  chooseOption() {
    if (this.taskmappingtaskconfiguration.choose == 'central') {
      this.isDisplay = true;
      this.getCategoryOfLawListFromAPI = [];
      this.spinner.show();
      this.getState();
    } else {
      this.isDisplay = false;
    }
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

  ValidateEntityFilter(value) {
    if (value === '0' || value === 0) {
      this.entityFilterHasError = true;
    } else {
      this.entityFilterHasError = false;
      this.taskmappingtaskconfiguration.unit = 0;
      this.taskmappingtaskconfiguration.functions = 0;
      this.spinner.show();
      this.commonService.getUnits(this.taskmappingtaskconfiguration.entity).subscribe(
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
      this.taskmappingtaskconfiguration.functions = 0;
      this.spinner.show();
      this.commonService.getFunction(this.taskmappingtaskconfiguration.unit).subscribe(
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
        dept_id: parseInt(this.taskmappingtaskconfiguration.functions.toString()),
        loca_id: parseInt(this.taskmappingtaskconfiguration.unit.toString()),
        orga_id: parseInt(this.taskmappingtaskconfiguration.entity.toString())
      };

      this.taskmappingtaskconfiguration.owner = 0;
      this.taskmappingtaskconfiguration.approver = 0;
      this.getOwnerListFilterFromAPI = [];
      this.getApproverListFilterFromAPI = [];

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
        dept_id: parseInt(this.taskmappingtaskconfiguration.functions.toString()),
        loca_id: parseInt(this.taskmappingtaskconfiguration.unit.toString()),
        orga_id: parseInt(this.taskmappingtaskconfiguration.entity.toString())
      };

      this.taskmappingtaskconfiguration.approver = 0;
      this.getApproverListFilterFromAPI = [];
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

    if (this.taskmappingtaskconfiguration.country != 0) {
      this.getState();
    }
  }

  getLegislation() {
    this.getRulesListFromAPI = [];
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

  getData() {
    const data = {
      ChooseSOrC: this.taskmappingtaskconfiguration.choose,
      cat_id: this.taskmappingtaskconfiguration.categoryOdLaws,
      country_id: this.taskmappingtaskconfiguration.country.toString(),
      dataRequiredFor: "tasksmapping",
      searching_for: "tasksmapping",
      state_id: this.taskmappingtaskconfiguration.state == 0 ? 2 : this.taskmappingtaskconfiguration.state,
      legi_id: this.taskmappingtaskconfiguration.legislation
    };
    return data;
  }

  getState() {
    this.spinner.show();
    this.commonService.getState(this.taskmappingtaskconfiguration.country).subscribe(
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

  changeImpactOnEntity(value) {
    this.Impact = [];
    this.ImpactOnUnit = [];
    this.saveConfigurationModel.impact = '';
    this.saveConfigurationModel.impactOnUnit = '';
    for (let i = 0; i < this.ImpactOnEntity.length; i++) {
      if (this.ImpactOnEntity[i] == value) {
        this.ImpactOnUnit.push(this.ImpactOnEntity[i]);
        this.Impact.push(this.ImpactOnEntity[i]);
        break;
      }
      else {
        this.ImpactOnUnit.push(this.ImpactOnEntity[i]);
        this.Impact.push(this.ImpactOnEntity[i]);
      }
    }
  }

  getTodaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }


  onSubmit() {
    var tasks_list_Row = [];
    for (let i = 0; i < this.selectedRecords.length; i++) {
      for (let j = 0; j < this.responseData.length; j++) {
        if (this.selectedRecords[i] == this.responseData[j].tmap_client_task_id) {
          tasks_list_Row.push({
            "dtco_client_task_id": this.responseData[j].tmap_client_task_id //,
           // "ttrn_performer_user_id": parseInt(this.responseData[j].exec_id)
          });
        }
      }
    }

    var data = {
      dtco_after_before: this.saveConfigurationModel.dtco_after_before,
      dtco_event: this.saveConfigurationModel.dtco_event,
      dtco_fh_days: this.saveConfigurationModel.dtco_fh_days,
      dtco_legal_days: this.saveConfigurationModel.dtco_legal_days,
      dtco_pr_days: this.saveConfigurationModel.dtco_pr_days,
      dtco_rw_days: this.saveConfigurationModel.dtco_rw_days,
      dtco_sub_event: this.saveConfigurationModel.dtco_sub_event,
      dtco_uh_days: this.saveConfigurationModel.dtco_uh_days,
      ttrn_prior_days_buffer: this.saveConfigurationModel.ttrn_prior_days_buffer,
      tasks_list: tasks_list_Row,
      validate_dates: "TRUE"      
    };

    this.spinner.show();
    
    this.taskmappingtaskconfigurationService.saveDefaultTaskConfiguration(data).subscribe(
      res => {
        if (res.response.status == 'Success') {
          this.alertify.success(`Default Configuration saved successfully.`);
          this.router.navigate(['task-mapping']);
        }
        else {
          this.alertify.error(`Configuration not saved successfully.`);
        }

        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );
  }

}
