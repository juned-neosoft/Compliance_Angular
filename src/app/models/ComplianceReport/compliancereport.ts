export class Compliancereport {
    public report_period: string;
    public from_date: string;
    public to_date: string;
    public entity: string;
    public unit: string;
    public function: string;
    public compiled_noncompiled: string;
    public impact: string;

    constructor() {
        this.report_period = "";
        this.from_date="";
        this.to_date = "";
        this.entity = "0";
        this.unit = "0";
        this.function = "0";
        this.compiled_noncompiled = "NA";
        this.impact = "NA";
    }
}
