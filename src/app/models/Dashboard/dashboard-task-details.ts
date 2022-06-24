export class DashboardTaskDetails {
    public function_head: any;
    public evaluator: any;
    public executor: any;
    public function: any;
    public unit: any;
    public entity: any;
    public unit_task_id: any;
    public legislation: any;
    public rule: any;
    public reference: any;
    public who: any;
    public when: any;
    public activity: any;
    public procedure: any;
    public more_information: any;
    public prescriptive: any;
    public frequency: any;
    public form_no: any;
    public due_date: any;
    public specific_due_date: any;
    public type_of_task: any;
    public level: any;
    public excemption_criteria: any;
    public event: any;
    public sub_event: any;
    public implications: any;
    public imprisonment: any;
    public imprisonment_applies_to: any;
    public fine_amount: any;
    public fine_amount_per_day: any;
    public impact: any;
    public impact_on_unit: any;
    public impact_on_entity: any;
    public interlinkage: any;
    public linked_task_id: any;
    public weblink: any;
    public lexcare_task_id: any;
    constructor() {

    }
}


export class UpdateTask {
    public completionDate: any;
    public remark: any;
    public uploadProofOfCompliance: any;

    constructor() {

    }
}

export class ReasonForNonComplianceTask {
    public ttrn_reason_for_non_compliance: string;
    public ttrn_id: number;

    constructor() {
        this.ttrn_reason_for_non_compliance = '';
        this.ttrn_id = 0;
    }
}

export class DeleteTaskModel {
    public ttrn_completed_date: string;
    public ttrn_id: number;
    public client_task_id: string;

    constructor() {
        this.ttrn_completed_date = '';
        this.ttrn_id = 0;
        this.client_task_id = '';
    }
}

export class ReOpenTaskModel {
    public ttrn_id: number;
    public reopen_comment: string;

    constructor() {
        this.ttrn_id = 0;
        this.reopen_comment = '';
    }
}

export class ApproveTaskModel {
    public ttrn_id: number;

    constructor() {
        this.ttrn_id = 0;
    }
}

export class CompleteUpdateTaskModel {
    public ttrn_id: number;
    public ttrn_completed_date: string;
    public ttrn_performer_comments: string;
    public ttrn_reason_for_non_compliance: string;
    public ttrn_ids: [];
    public ttrn_event_not_occure: boolean;
    public ttrn_proof_of_compliance: any;
    public task_frequency: string;
    public ttrn_legal_task_status: string;
    public ttrn_document: string;

    constructor() {
        this.ttrn_id = 0;
        this.ttrn_completed_date = '';
        this.ttrn_performer_comments = '';
        this.ttrn_reason_for_non_compliance = '';
        this.ttrn_ids = [];
        this.ttrn_event_not_occure = false;
        this.task_frequency = '';
        this.ttrn_legal_task_status = '';
        this.ttrn_document = '';
    }
}

export class EditDatesModel {
    public validate_dates: string;
    public ttrn_prior_days_buffer: number;
    public ttrn_id: number;
    public ttrn_legal_due_date: string;
    public ttrn_uh_due_date: string;
    public ttrn_fh_due_date: string;
    public ttrn_rw_due_date: string;
    public ttrn_pr_due_date: string;
    public ttrn_performer_name: string;

    public Prev_LegalDueDate: string;
    public Prev_UnitHeadDate: string;
    public Prev_FunctionDate: string;
    public Prev_ApproverDate: string;
    public Prev_OwnerDate: string;

    public user_email: string;



    public ttrn_impact_on_organization: string;
    public ttrn_impact_on_unit: string;
    public ttrn_impact: string;
    public ttrn_frequency_for_operation: string;
    public ttrn_alert_days: string;
    public ttrn_document: string;
    public ttrn_historical: string;
    public ttrn_allow_approver_reopening: string;
    public ttrn_allow_back_date_completion : string;


    constructor() {
        this.validate_dates = '';
        this.ttrn_prior_days_buffer = 0;
        this.ttrn_id = 0;
        this.ttrn_legal_due_date = '';
        this.ttrn_uh_due_date = '';
        this.ttrn_fh_due_date = '';
        this.ttrn_rw_due_date = '';
        this.ttrn_pr_due_date = '';
        this.ttrn_performer_name = '';
        this.user_email = '';

        this.ttrn_impact_on_organization = '';
        this.ttrn_impact_on_unit = '';
        this.ttrn_impact = '';
        this.ttrn_frequency_for_operation = '';
        this.ttrn_alert_days = '';
        this.ttrn_document = '';
        this.ttrn_historical = '';
        this.ttrn_allow_approver_reopening = '';
        this.ttrn_allow_back_date_completion = '';
    }
}