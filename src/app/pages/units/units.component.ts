import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Pagination } from '../../models/Pagination/pagination';
import { UnitsService } from '../../services/Units/units.service';
import { AlertifyService } from '../../services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  public Pagination = new Pagination();
  public responseData: any;
  public TableFilter: string;

  constructor(
    private unitsService: UnitsService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.TableFilter = '';
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.unitsService.getList().subscribe(
      res => {
        this.spinner.hide();
        this.responseData = res.data;
        this.Pagination.TotalRecords = res.data.length;
      },
      err => {
        this.spinner.hide();
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );
  }

  editButton(id) {
    this.router.navigate([`/edit-units/${id}`]);
  }

  deleteButton(id) {
    this.spinner.show();
    this.unitsService.deleteUnit(id).subscribe(
      res => {
        this.spinner.hide();
        this.alertify.success(`${res.response.message}`);
        this.loadData();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );
  }

  exportExcel() {
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.responseData.forEach(element => {
      const obj = {
        'Sr. No.': countIndex,
        'Unit Name': element.loca_name,
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Unit_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Unit Name',
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.loca_name,
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Unit_Export_PDF');
    this.spinner.hide();
  }
}
