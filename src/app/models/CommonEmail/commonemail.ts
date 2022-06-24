export class Commonemail {
    public subject: string;
    public body: string;
    public entity: string;
    public unit: string;
    public fuction: string;
    public attachFile:string;
    public userlist: Array<any>;
    constructor() {
        this.subject = "";
        this.body = "";
        this.entity="";
        this.unit="";
        this.fuction="";
        this.userlist=[];
        this.attachFile="";
    }
}
