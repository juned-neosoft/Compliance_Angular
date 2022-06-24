import {
    ApexAxisChartSeries,
    ApexChart,
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexDataLabels,
    ApexXAxis,
    ApexPlotOptions,
    ApexStroke,
    ApexTitleSubtitle,
    ApexYAxis,
    ApexTooltip,
    ApexFill,
    ApexLegend
} from "ng-apexcharts";

export type BarChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    tooltip: ApexTooltip;
    fill: ApexFill;
    legend: ApexLegend;
};

export type PieChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
};
