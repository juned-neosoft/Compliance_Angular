export class Taskmappingtaskconfiguration {
    public country: number;
    public choose: string;
    public state: number;
    public categoryOdLaws: number;
    public legislation: number;
    public rules: number;
    public entity: number;
    public unit: number;
    public functions: number;
    public owner: number;
    public approver: number;
    public frequency: string;
    public event: string;
    public sub_event: string;

    constructor() {
        this.country = 0;
        this.choose = 'central';
        this.state = 0;
        this.categoryOdLaws = 0;
        this.legislation = 0;
        this.rules = 0;
        this.entity = 0;
        this.unit = 0;
        this.functions = 0;
        this.owner = 0;
        this.approver = 0;
        this.frequency = 'NA';
        this.event = 'NA';
        this.sub_event = 'NA';
    }
}


export class SaveConfigurationModel {

    public impactOnEntity: string;
    public impactOnUnit: string;
    public impact: string;
    public frequency: string;
    public daysBuffes: number;
    public alertPriorDays: number;
    public legalDueDate: string;
    public unitHeadDueDate: string;
    public functionHeadDueDate: string;
    public approverDueDate: string;
    public ownerDueDate: string;
    public extraAlert: boolean;
    public backDatesDays: number;
    public firstAlert: string;
    public secondAlert: string;
    public thirdAlert: string;
    public docRadio: string;
    public histRadio: string;
    public backDatesRadio: string;
    public taskMakerCheckerRadio: string;

    public tmap_client_tasks_id: string;
    public exec_id: number;

    public dtco_after_before: any;
    public dtco_event: any;
    public dtco_fh_days: 0;
    public dtco_legal_days: 0;
    public dtco_pr_days: 0;
    public dtco_rw_days: 0;
    public dtco_sub_event: any;
    public dtco_uh_days: any;
    public ttrn_prior_days_buffer: any;
    public validate_days: any;
    public ttrn_id:number;
    public ttrn_status:string;

    constructor() {
        this.ttrn_id = null;
        this.ttrn_status = null;
        this.impactOnEntity = '';
        this.impactOnUnit = '';
        this.impact = '';
        this.frequency = '';
        this.daysBuffes = 0;
        this.alertPriorDays = 0;
        this.legalDueDate = '';
        this.unitHeadDueDate = '';
        this.functionHeadDueDate = '';
        this.approverDueDate = '';
        this.ownerDueDate = '';
        this.extraAlert = false;
        this.backDatesDays = 0;
        this.firstAlert = '';
        this.secondAlert = '';
        this.thirdAlert = '';
        this.docRadio = '0';
        this.histRadio = '0';
        this.backDatesRadio = '0';
        this.taskMakerCheckerRadio = '0';

        this.tmap_client_tasks_id = '';
        this.exec_id = 0;

        this.dtco_after_before = '';
        this.dtco_event = '';
        this.dtco_fh_days = 0;
        this.dtco_legal_days = 0;
        this.dtco_pr_days = 0;
        this.dtco_rw_days = 0;
        this.dtco_sub_event = '';
        this.dtco_uh_days = 0;
        this.ttrn_prior_days_buffer = '';
        this.validate_days = 'TRUE';

    }
}