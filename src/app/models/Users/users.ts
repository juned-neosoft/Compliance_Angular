export class Users {
    public user_id: number;
    public user_first_name: string;
    public user_last_name: string;
    public user_mobile: string;
    public user_email: string;
    public user_username: string;
    public user_userpassword: string;
    public user_default_password_changed: string;
    public confirmPassword: string;
    public user_organization_id: number;
    public user_location_id: number;
    public user_location_id2: any;
    public user_department_id: number;
    public user_employee_id: string;
    public user_designation_id: number;
    public user_role_id: number;
    public user_address: string;
    public profile_pic: string;
    public user_added_by: number;
    public user_approval_status: string;
    public user_created_at: string;
    public user_enable_status: string;
    public isEnable: boolean;

    constructor() {
        this.user_id=0;
        this.user_first_name = '';
        this.user_last_name = '';
        this.user_mobile = '';
        this.user_email = '';
        this.user_username = '';
        this.user_userpassword = '';
        this.user_default_password_changed = '';
        this.confirmPassword = '';
        this.user_organization_id = 0;
        this.user_location_id = 0;
        this.user_department_id = 0;
        this.user_employee_id = '';
        this.user_designation_id = 0;
        this.user_role_id = 0;
        this.user_address = '';
        this.profile_pic = '';
        this.user_added_by = 0;
        this.user_approval_status = '1';
        this.user_created_at = '';
        this.user_enable_status = '1';
        this.isEnable = false;
    }
}
