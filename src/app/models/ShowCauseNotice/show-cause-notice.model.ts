export class ShowCauseNotice {

    public scau_orga_id: string;
    public scau_loca_id: string;
    public scau_dept_id: string;
    public scau_ralated_to: string;
    public scau_comments: string;
    public scau_action_taken: string;
    public scau_next_action_item: string;
    public scau_responsible_person: string;
    public scau_reporting_person: string;
    public scau_notice_date: string;
    public scau_received_date: string;
    public scau_deadline_date: string;
    public scau_remainder_date: string;
    public show_cause_doc:string;

    constructor() {
        this.scau_orga_id = '0';
        this.scau_loca_id = '0';
        this.scau_dept_id = '0';
        this.scau_ralated_to = '';
        this.scau_comments = '';
        this.scau_action_taken = '';
        this.scau_next_action_item = '';
        this.scau_responsible_person = '0';
        this.scau_reporting_person = '0';
        this.scau_notice_date = '';
        this.scau_received_date = '';
        this.scau_deadline_date = '';
        this.scau_remainder_date = '';
    }
}
