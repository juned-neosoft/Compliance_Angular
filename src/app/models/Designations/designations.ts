export class Designations {
    public desi_added_by: number;
    public desi_approval_status: string;
    public desi_created_at: string;
    public desi_enable_status: string;
    public desi_id: number;
    public desi_name: string;
    public desi_parent_id: number;
    public is_deleted: boolean;
    public designation_name: string;

    constructor() {
        this.desi_added_by = 0,
            this.desi_approval_status = '',
            this.desi_created_at = '',
            this.desi_enable_status = '',
            this.desi_id = 0,
            this.desi_name = '',
            this.desi_parent_id = 0,
            this.is_deleted = false,
            this.designation_name = ''
    }
}
