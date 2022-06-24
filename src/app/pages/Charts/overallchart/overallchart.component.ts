import { Component, Input, OnInit } from "@angular/core";
import { ApexLegend, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  colors: [];
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
};

@Component({
  selector: 'app-overallchart',
  templateUrl: './overallchart.component.html',
  styleUrls: ['./overallchart.component.css']
})
export class OverallchartComponent implements OnInit {
  @Input('OverallChart') public overallChartData;
  // @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit() {
    this.chartOptions = {
      series: this.overallChartData.series,
      chart: {
        width: 450,
        type: "pie"
      },
      labels: this.overallChartData.labels,
      colors: this.overallChartData.colors,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      }
    };
  }

  constructor() {
  }
}
