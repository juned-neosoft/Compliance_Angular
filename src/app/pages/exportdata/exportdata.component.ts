import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { Exportdata } from 'src/app/models/ExportData/exportdata';
import { ExportdataService } from 'src/app/services/ExportData/exportdata.service';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-exportdata',
  templateUrl: './exportdata.component.html',
  styleUrls: ['./exportdata.component.css']
})
export class ExportdataComponent implements OnInit {
  public responseData: any;
  public responseDataRow: any;
  public TableFilter = '';
  public Pagination = new Pagination();
  public exportdata = new Exportdata();
  constructor(
    private alertify: AlertifyService,
    private exportdataService: ExportdataService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.responseData = [];
    this.onLoad()
  }

  onLoad() {
    this.spinner.show();
    this.exportdataService.GetAllTasksForExport().subscribe(
      res => {
        this.spinner.hide();
        this.responseDataRow = res.response.data.AllTasks;
        this.responseData = this.responseDataRow;
        this.Pagination.TotalRecords = this.responseData.length;

        console.log(this.responseDataRow);
      },
      err => {
        this.spinner.hide();
        this.responseData = [];
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );
  }

  CheckSelectAll() {
    if (this.exportdata.selectAll_Filter == true) {
      this.exportdata.country_Filter = true;
      this.exportdata.state_Filter = true;
      this.exportdata.categoryOfLaw_Filter = true;
      this.exportdata.legislation_Filter = true;
      this.exportdata.rule_Filter = true;
      this.exportdata.reference_Filter = true;
      this.exportdata.who_Filter = true;
      this.exportdata.when_Filter = true;
      this.exportdata.complianceActivity_Filter = true;
      this.exportdata.procedure_Filter = true;
      this.exportdata.frequency_Filter = true;
      this.exportdata.legalDueDate_Filter = true;
      this.exportdata.effectiveDate_Filter = true;
      this.exportdata.event_Filter = true;
      this.exportdata.exemptionCreiteria_Filter = true;
      this.exportdata.fineAmount_Filter = true;
      this.exportdata.formNo_Filter = true;
      this.exportdata.taskImpact_Filter = true;
      this.exportdata.organizationImpact_Filter = true;
      this.exportdata.unitImpact_Filter = true;
      this.exportdata.implication_Filter = true;
      this.exportdata.imprisonmentDuration_Filter = true;
      this.exportdata.imprisonmentAppliesTo_Filter = true;
      this.exportdata.taskLevel_Filter = true;
      this.exportdata.linkedTaskId_Filter = true;
      this.exportdata.moreInfo_Filter = true;
      this.exportdata.interlinkage_Filter = true;
      this.exportdata.prohibitivePrecriptive_Filter = true;
      this.exportdata.specificDueDate_Filter = true;
      this.exportdata.subEvent_Filter = true;
      this.exportdata.subsequentAmountPerDay_Filter = true;
      this.exportdata.typeOfTask_Filter = true;
      this.exportdata.weblink_Filter = true;
      this.exportdata.statutoryAuthority_Filter = true;
      this.exportdata.configuredFrequency_Filter = true;
      this.exportdata.configuredLegalDueDate_Filter = true;
      this.exportdata.configuredUnitHeadDate_Filter = true;
      this.exportdata.configuredFunctionHeadDate_Filter = true;
      this.exportdata.configuredEvaluatorDate_Filter = true;
      this.exportdata.ConfiguredExecutorDate_Filter = true;
      this.exportdata.ConfiguredStatus_Filter = true;
      this.exportdata.entityName_Filter = true;
      this.exportdata.unitName_Filter = true;
      this.exportdata.departmentName_Filter = true;
      this.exportdata.executorName_Filter = true;
      this.exportdata.evaluatorName_Filter = true;
      this.exportdata.functionHeadName_Filter = true;
      this.exportdata.priorDaysBuffer_Filter = true;
      this.exportdata.backDaysAllowed_Filter = true;
      this.exportdata.alertDays_Filter = true;
      this.exportdata.emcureTaskId_Filter = true;
      this.exportdata.document_Filter = true;
      this.exportdata.perfomerComments_Filter = true;
      this.exportdata.reasonForNonCompliance_Filter = true;
    }
    else {
      this.exportdata.country_Filter = false;
      this.exportdata.state_Filter = false;
      this.exportdata.categoryOfLaw_Filter = false;
      this.exportdata.legislation_Filter = false;
      this.exportdata.rule_Filter = false;
      this.exportdata.reference_Filter = false;
      this.exportdata.who_Filter = false;
      this.exportdata.when_Filter = false;
      this.exportdata.complianceActivity_Filter = false;
      this.exportdata.procedure_Filter = false;
      this.exportdata.frequency_Filter = false;
      this.exportdata.legalDueDate_Filter = false;
      this.exportdata.effectiveDate_Filter = false;
      this.exportdata.event_Filter = false;
      this.exportdata.exemptionCreiteria_Filter = false;
      this.exportdata.fineAmount_Filter = false;
      this.exportdata.formNo_Filter = false;
      this.exportdata.taskImpact_Filter = false;
      this.exportdata.organizationImpact_Filter = false;
      this.exportdata.unitImpact_Filter = false;
      this.exportdata.implication_Filter = false;
      this.exportdata.imprisonmentDuration_Filter = false;
      this.exportdata.imprisonmentAppliesTo_Filter = false;
      this.exportdata.taskLevel_Filter = false;
      this.exportdata.linkedTaskId_Filter = false;
      this.exportdata.moreInfo_Filter = false;
      this.exportdata.interlinkage_Filter = false;
      this.exportdata.prohibitivePrecriptive_Filter = false;
      this.exportdata.specificDueDate_Filter = false;
      this.exportdata.subEvent_Filter = false;
      this.exportdata.subsequentAmountPerDay_Filter = false;
      this.exportdata.typeOfTask_Filter = false;
      this.exportdata.weblink_Filter = false;
      this.exportdata.statutoryAuthority_Filter = false;
      this.exportdata.configuredFrequency_Filter = false;
      this.exportdata.configuredLegalDueDate_Filter = false;
      this.exportdata.configuredUnitHeadDate_Filter = false;
      this.exportdata.configuredFunctionHeadDate_Filter = false;
      this.exportdata.configuredEvaluatorDate_Filter = false;
      this.exportdata.ConfiguredExecutorDate_Filter = false;
      this.exportdata.ConfiguredStatus_Filter = false;
      this.exportdata.entityName_Filter = false;
      this.exportdata.unitName_Filter = false;
      this.exportdata.departmentName_Filter = false;
      this.exportdata.executorName_Filter = false;
      this.exportdata.evaluatorName_Filter = false;
      this.exportdata.functionHeadName_Filter = false;
      this.exportdata.priorDaysBuffer_Filter = false;
      this.exportdata.backDaysAllowed_Filter = false;
      this.exportdata.alertDays_Filter = false;
      this.exportdata.emcureTaskId_Filter = false;
      this.exportdata.document_Filter = false;
      this.exportdata.perfomerComments_Filter = false;
      this.exportdata.reasonForNonCompliance_Filter = false;
    }
  }

  checkIsAllSelected() {
    if (
      this.exportdata.country_Filter == false
      || this.exportdata.state_Filter == false
      || this.exportdata.categoryOfLaw_Filter == false
      || this.exportdata.legislation_Filter == false
      || this.exportdata.rule_Filter == false
      || this.exportdata.reference_Filter == false
      || this.exportdata.who_Filter == false
      || this.exportdata.when_Filter == false
      || this.exportdata.complianceActivity_Filter == false
      || this.exportdata.procedure_Filter == false
      || this.exportdata.frequency_Filter == false
      || this.exportdata.legalDueDate_Filter == false
      || this.exportdata.effectiveDate_Filter == false
      || this.exportdata.event_Filter == false
      || this.exportdata.exemptionCreiteria_Filter == false
      || this.exportdata.fineAmount_Filter == false
      || this.exportdata.formNo_Filter == false
      || this.exportdata.taskImpact_Filter == false
      || this.exportdata.organizationImpact_Filter == false
      || this.exportdata.unitImpact_Filter == false
      || this.exportdata.implication_Filter == false
      || this.exportdata.imprisonmentDuration_Filter == false
      || this.exportdata.imprisonmentAppliesTo_Filter == false
      || this.exportdata.taskLevel_Filter == false
      || this.exportdata.linkedTaskId_Filter == false
      || this.exportdata.moreInfo_Filter == false
      || this.exportdata.interlinkage_Filter == false
      || this.exportdata.prohibitivePrecriptive_Filter == false
      || this.exportdata.specificDueDate_Filter == false
      || this.exportdata.subEvent_Filter == false
      || this.exportdata.subsequentAmountPerDay_Filter == false
      || this.exportdata.typeOfTask_Filter == false
      || this.exportdata.weblink_Filter == false
      || this.exportdata.statutoryAuthority_Filter == false
      || this.exportdata.configuredFrequency_Filter == false
      || this.exportdata.configuredLegalDueDate_Filter == false
      || this.exportdata.configuredUnitHeadDate_Filter == false
      || this.exportdata.configuredFunctionHeadDate_Filter == false
      || this.exportdata.configuredEvaluatorDate_Filter == false
      || this.exportdata.ConfiguredExecutorDate_Filter == false
      || this.exportdata.ConfiguredStatus_Filter == false
      || this.exportdata.entityName_Filter == false
      || this.exportdata.unitName_Filter == false
      || this.exportdata.departmentName_Filter == false
      || this.exportdata.executorName_Filter == false
      || this.exportdata.evaluatorName_Filter == false
      || this.exportdata.functionHeadName_Filter == false
      || this.exportdata.priorDaysBuffer_Filter == false
      || this.exportdata.backDaysAllowed_Filter == false
      || this.exportdata.alertDays_Filter == false
      || this.exportdata.emcureTaskId_Filter == false
      || this.exportdata.document_Filter == false
      || this.exportdata.perfomerComments_Filter == false
      || this.exportdata.reasonForNonCompliance_Filter == false
    ) {
      this.exportdata.selectAll_Filter = false;
    }
    else {
      this.exportdata.selectAll_Filter = true;
    }
  }

  exportExcel() {
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.responseData.forEach(element => {
      const obj = {};

      obj['Sr. No.'] = countIndex;
      obj['Client task ID'] = element.tmap_client_task_id;

      if (this.exportdata.selectAll_Filter == true || this.exportdata.country_Filter == true) { obj['Country'] = element.task_country; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.state_Filter == true) { obj['State'] = element.task_state; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.categoryOfLaw_Filter == true) { obj['Category Of Law'] = element.task_cat_law; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.legislation_Filter == true) { obj['Legislation'] = element.task_legi_name; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.rule_Filter == true) { obj['Rule'] = element.task_rule_name; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.reference_Filter == true) { obj['Reference'] = element.task_reference; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.who_Filter == true) { obj['Who'] = element.task_activity_who; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.when_Filter == true) { obj['When'] = element.task_activity_when; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.complianceActivity_Filter == true) { obj['Compliance Activity'] = element.task_activity; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.procedure_Filter == true) { obj['Procedure'] = element.task_procedure; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.frequency_Filter == true) { obj['Frequency'] = element.task_frequency_for_operation; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.legalDueDate_Filter == true) { obj['Legal Due date'] = element.task_legal_due_date; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.effectiveDate_Filter == true) { obj['Effective Date'] = element.task_effective_date; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.event_Filter == true) { obj['Event'] = element.task_event; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.exemptionCreiteria_Filter == true) { obj['Exemption Criteria'] = element.task_excemption_criteria; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.fineAmount_Filter == true) { obj['Fine Amount'] = element.task_fine_amount; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.formNo_Filter == true) { obj['Form No'] = element.task_form_no; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.taskImpact_Filter == true) { obj['Task Impact'] = element.task_impact; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.organizationImpact_Filter == true) { obj['Impact on organization'] = element.task_impact_organization; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.unitImpact_Filter == true) { obj['Impact On Unit'] = element.task_impact_on_unit; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.implication_Filter == true) { obj['Implication'] = element.task_implications; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.imprisonmentDuration_Filter == true) { obj['Imprisonment Duration'] = element.task_imprisonment_duration; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.imprisonmentAppliesTo_Filter == true) { obj['Imprisonment Applies To'] = element.task_imprisonment_applies_to; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.taskLevel_Filter == true) { obj['Task level'] = element.task_level; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.linkedTaskId_Filter == true) { obj['Linked Task Id'] = element.task_linked_task_id; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.moreInfo_Filter == true) { obj['More Information'] = element.task_more_info; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.interlinkage_Filter == true) { obj['Interlinkage'] = element.task_interlinkage; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.prohibitivePrecriptive_Filter == true) { obj['Prohibitive / prescriptive'] = element.task_prohibitive; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.specificDueDate_Filter == true) { obj['Specific Due Date'] = element.task_specific_due_date; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.subEvent_Filter == true) { obj['Sub Event'] = element.task_sub_event; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.subsequentAmountPerDay_Filter == true) { obj['Subsequent Amount per day'] = element.task_subsequent_amount_per_day; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.typeOfTask_Filter == true) { obj['Type Of Task'] = element.task_type_of_task; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.weblink_Filter == true) { obj['Weblinks'] = element.task_weblinks; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.statutoryAuthority_Filter == true) { obj['Statutory Authority'] = element.task_statutory_authority; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredFrequency_Filter == true) { obj['Config. Frequency'] = element.task_frequency_for_operation; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredLegalDueDate_Filter == true) { obj['Config. Legal Due Date'] = element.task_legal_due_date; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredUnitHeadDate_Filter == true) { obj['Unit Head Date'] = element.task_uh_due_date; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredFunctionHeadDate_Filter == true) { obj['Function Head Date'] = element.task_fh_due_date; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredEvaluatorDate_Filter == true) { obj['Evaluator Date'] = element.task_rw_due_date; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.ConfiguredExecutorDate_Filter == true) { obj['Executor Date'] = element.task_pr_due_date; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.ConfiguredStatus_Filter == true) { obj['Status'] = element.ttrn_status; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.entityName_Filter == true) { obj['Entity'] = element.orga_name; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.unitName_Filter == true) { obj['Unit'] = element.loca_name; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.departmentName_Filter == true) { obj['Function'] = element.dept_name; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.executorName_Filter == true) { obj['Executor Name'] = element.performer_name; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.evaluatorName_Filter == true) { obj['Evaluator Name'] = element.reviewer_name; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.functionHeadName_Filter == true) { obj['Function Head Name'] = element.functionHead_name; }

      if (this.exportdata.selectAll_Filter == true || this.exportdata.priorDaysBuffer_Filter == true) { obj['Buffer Days'] = element.ttrn_prior_days_buffer; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.backDaysAllowed_Filter == true) { obj['Back Days Allowed'] = element.ttrn_no_of_back_days_allowed == 0 ? 'NO' : 'YES'; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.alertDays_Filter == true) { obj['Alert Days'] = element.ttrn_alert_days; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.emcureTaskId_Filter == true) { obj['Emcure Task ID'] = element.task_lexcare_task_id; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.document_Filter == true) { obj['Document Mandatory'] = element.ttrn_document == 0 ? 'NO' : 'YES'; }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.perfomerComments_Filter == true) { obj['Comments'] = element.ttrn_performer_comments }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.reasonForNonCompliance_Filter == true) { obj['Reason for non-compliance'] = element.ttrn_reason_for_non_compliance }

      console.log(obj);
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = this.getCols();

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [];

      temp.push(countIndex);
      temp.push(element.tmap_client_task_id);

      if (this.exportdata.selectAll_Filter == true || this.exportdata.country_Filter == true) { temp.push(element.task_country); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.state_Filter == true) { temp.push(element.task_state); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.categoryOfLaw_Filter == true) { temp.push(element.task_cat_law); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.legislation_Filter == true) { temp.push(element.task_legi_name); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.rule_Filter == true) { temp.push(element.task_rule_name); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.reference_Filter == true) { temp.push(element.task_reference); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.who_Filter == true) { temp.push(element.task_activity_who); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.when_Filter == true) { temp.push(element.task_activity_when); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.complianceActivity_Filter == true) { temp.push(element.task_activity); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.procedure_Filter == true) { temp.push(element.task_procedure); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.frequency_Filter == true) { temp.push(element.task_frequency_for_operation); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.legalDueDate_Filter == true) { temp.push(element.task_legal_due_date); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.effectiveDate_Filter == true) { temp.push(element.task_effective_date); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.event_Filter == true) { temp.push(element.task_event); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.exemptionCreiteria_Filter == true) { temp.push(element.task_excemption_criteria); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.fineAmount_Filter == true) { temp.push(element.task_fine_amount); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.formNo_Filter == true) { temp.push(element.task_form_no); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.taskImpact_Filter == true) { temp.push(element.task_impact); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.organizationImpact_Filter == true) { temp.push(element.task_impact_organization); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.unitImpact_Filter == true) { temp.push(element.task_impact_on_unit); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.implication_Filter == true) { temp.push(element.task_implications); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.imprisonmentDuration_Filter == true) { temp.push(element.task_imprisonment_duration); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.imprisonmentAppliesTo_Filter == true) { temp.push(element.task_imprisonment_applies_to); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.taskLevel_Filter == true) { temp.push(element.task_level); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.linkedTaskId_Filter == true) { temp.push(element.task_linked_task_id); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.moreInfo_Filter == true) { temp.push(element.task_more_info); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.interlinkage_Filter == true) { temp.push(element.task_interlinkage); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.prohibitivePrecriptive_Filter == true) { temp.push(element.task_prohibitive); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.specificDueDate_Filter == true) { temp.push(element.task_specific_due_date); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.subEvent_Filter == true) { temp.push(element.task_sub_event); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.subsequentAmountPerDay_Filter == true) { temp.push(element.task_subsequent_amount_per_day); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.typeOfTask_Filter == true) { temp.push(element.task_type_of_task); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.weblink_Filter == true) { temp.push(element.task_weblinks); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.statutoryAuthority_Filter == true) { temp.push(element.task_statutory_authority); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredFrequency_Filter == true) { temp.push(element.task_frequency_for_operation); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredLegalDueDate_Filter == true) { temp.push(element.task_legal_due_date); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredUnitHeadDate_Filter == true) { temp.push(element.task_uh_due_date); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredFunctionHeadDate_Filter == true) { temp.push(element.task_fh_due_date); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredEvaluatorDate_Filter == true) { temp.push(element.task_rw_due_date); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.ConfiguredExecutorDate_Filter == true) { temp.push(element.task_pr_due_date); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.ConfiguredStatus_Filter == true) { temp.push(element.ttrn_status); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.entityName_Filter == true) { temp.push(element.orga_name); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.unitName_Filter == true) { temp.push(element.loca_name); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.departmentName_Filter == true) { temp.push(element.dept_name); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.executorName_Filter == true) { temp.push(element.performer_name); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.evaluatorName_Filter == true) { temp.push(element.reviewer_name); }
      if (this.exportdata.selectAll_Filter == true || this.exportdata.functionHeadName_Filter == true) { temp.push(element.functionHead_name); }

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Export_PDF');
    this.spinner.hide();
  }

  getCols() {
    var cols = [];

    cols.push('Sr. No.');
    cols.push('Client task ID');

    if (this.exportdata.selectAll_Filter == true || this.exportdata.country_Filter == true) { cols.push('Country'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.state_Filter == true) { cols.push('State'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.categoryOfLaw_Filter == true) { cols.push('Category Of Law'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.legislation_Filter == true) { cols.push('Legislation'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.rule_Filter == true) { cols.push('Rule'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.reference_Filter == true) { cols.push('Reference'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.who_Filter == true) { cols.push('Who'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.when_Filter == true) { cols.push('When'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.complianceActivity_Filter == true) { cols.push('Compliance Activity'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.procedure_Filter == true) { cols.push('Procedure'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.frequency_Filter == true) { cols.push('Frequency'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.legalDueDate_Filter == true) { cols.push('Legal Due date'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.effectiveDate_Filter == true) { cols.push('Effective Date'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.event_Filter == true) { cols.push('Event'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.exemptionCreiteria_Filter == true) { cols.push('Exemption Criteria'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.fineAmount_Filter == true) { cols.push('Fine Amount'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.formNo_Filter == true) { cols.push('Form No'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.taskImpact_Filter == true) { cols.push('Task Impact'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.organizationImpact_Filter == true) { cols.push('Impact on organization'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.unitImpact_Filter == true) { cols.push('Impact On Unit'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.implication_Filter == true) { cols.push('Implication'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.imprisonmentDuration_Filter == true) { cols.push('Imprisonment Duration'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.imprisonmentAppliesTo_Filter == true) { cols.push('Imprisonment Applies To'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.taskLevel_Filter == true) { cols.push('Task level'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.linkedTaskId_Filter == true) { cols.push('Linked Task Id'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.moreInfo_Filter == true) { cols.push('More Information'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.interlinkage_Filter == true) { cols.push('Interlinkage'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.prohibitivePrecriptive_Filter == true) { cols.push('Prohibitive / prescriptive'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.specificDueDate_Filter == true) { cols.push('Specific Due Date'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.subEvent_Filter == true) { cols.push('Sub Event'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.subsequentAmountPerDay_Filter == true) { cols.push('Subsequent Amount per day'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.typeOfTask_Filter == true) { cols.push('Type Of Task'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.weblink_Filter == true) { cols.push('Weblinks'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.statutoryAuthority_Filter == true) { cols.push('Statutory Authority'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredFrequency_Filter == true) { cols.push('Config. Frequency'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredLegalDueDate_Filter == true) { cols.push('Config. Legal Due Date'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredUnitHeadDate_Filter == true) { cols.push('Unit Head Date'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredFunctionHeadDate_Filter == true) { cols.push('Function Head Date'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.configuredEvaluatorDate_Filter == true) { cols.push('Evaluator Date'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.ConfiguredExecutorDate_Filter == true) { cols.push('Executor Date'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.ConfiguredStatus_Filter == true) { cols.push('Status'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.entityName_Filter == true) { cols.push('Entity'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.unitName_Filter == true) { cols.push('Unit'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.departmentName_Filter == true) { cols.push('Function'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.executorName_Filter == true) { cols.push('Executor Name'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.evaluatorName_Filter == true) { cols.push('Evaluator Name'); }
    if (this.exportdata.selectAll_Filter == true || this.exportdata.functionHeadName_Filter == true) { cols.push('Function Head Name'); }

    return cols;
  }

}
