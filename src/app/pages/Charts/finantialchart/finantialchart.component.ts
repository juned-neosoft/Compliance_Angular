import { Component, Input, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  colors: any;
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-finantialchart',
  templateUrl: './finantialchart.component.html',
  styleUrls: ['./finantialchart.component.css']
})
export class FinantialchartComponent implements OnInit {
  @Input('FinantialChart') public finantialChartData;
  // @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit() {
    console.log(this.finantialChartData);

    this.chartOptions = {
      colors: this.finantialChartData.colors,
      series: this.finantialChartData.series,
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: this.finantialChartData.categories
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      },
      fill: {
        opacity: 1
      }
    };
  }

  constructor() {

  }
}
