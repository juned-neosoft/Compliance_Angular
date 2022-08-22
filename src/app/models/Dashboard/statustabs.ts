export class Statustabs {
    public Complied: number;
    public Posing: number;
    public NonComplied: number;
    public Delayed: number;
    public DelayedReported: number;
    public WFA: number;
    public ReOpened: number;
    public allComplied: number;

    constructor() {
        this.Complied = 0;
        this.Posing = 0;
        this.NonComplied = 0;
        this.Delayed = 0;
        this.DelayedReported = 0;
        this.WFA = 0;
        this.ReOpened = 0;
        this.allComplied = 0;
    }
}
