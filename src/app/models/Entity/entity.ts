export class Entity {
    public orga_id: number;
    public orga_name: string;
    public orga_parent_id: number;
    public orga_parent_name: string;

    constructor() {
        this.orga_id = 0,
            this.orga_name = '',
            this.orga_parent_id = 0,
            this.orga_parent_name = ''
    }
}
