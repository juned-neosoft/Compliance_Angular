import { Component, Input, OnInit, Output } from "@angular/core";
import { ApexLegend, ChartComponent } from "ng-apexcharts";
import { EventEmitter } from '@angular/core';
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
  @Output() sendData = new EventEmitter<any>();
  // @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit() {
let $this = this;
    this.chartOptions = {
      series: this.overallChartData.series,
      chart: {
        width: 450,
        type: "pie",
        events: {
        dataPointSelection: function(event, chartContext, config) {
          console.log(config.w.config.labels[config.dataPointIndex]);
          // console.log(config.w.config.series[config.dataPointIndex]);
          $this.sendData.emit(config.w.config.labels[config.dataPointIndex])
      }
      }
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
