export class Repository {
    public entitySearch: number;
    public unitSearch: number;
    public functionSearch: number;
    public ownerSearch: number;
    public approverSearch: number;
    public categoryofLawSearch: number;
    public impactSearch: string;
    public prohibitivePrescriptiveSearch: string;
    public typeOfTaskSearch: string;
    public frequencySearch: string;
    public activeInactiveSearch: string;
    public legislationSearch: number;
    public ruleSearch: number;
    public eventsSearch: string;
    public subEventsSearch: string;

    constructor() {
        this.entitySearch = 0;
        this.unitSearch = 0;
        this.functionSearch = 0;
        this.ownerSearch = 0;
        this.approverSearch = 0;
        this.categoryofLawSearch = 0;
        this.impactSearch = '';
        this.prohibitivePrescriptiveSearch = '';
        this.typeOfTaskSearch = '';
        this.frequencySearch = '';
        this.activeInactiveSearch = '';
        this.legislationSearch = 0;
        this.ruleSearch = 0;
        this.eventsSearch = '';
        this.subEventsSearch = '';
    }
}
