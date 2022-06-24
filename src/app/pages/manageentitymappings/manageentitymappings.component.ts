import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Pagination } from '../../models/Pagination/pagination';
import { ManageentitymappingsService } from 'src/app/services/ManageEntityMappings/manageentitymappings.service';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-manageentitymappings',
  templateUrl: './manageentitymappings.component.html',
  styleUrls: ['./manageentitymappings.component.css']
})
export class ManageentitymappingsComponent implements OnInit {
  public Pagination = new Pagination();
  public responseData: any;
  public TableFilter: string;

  constructor(
    private manageentitymappingsService: ManageentitymappingsService,
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
    this.manageentitymappingsService.getList().subscribe(
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
    this.router.navigate([`/edit-manageentitymappings/${id}`]);
  }

  exportExcel() {
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.responseData.forEach(element => {
      const obj = {
        'Sr. No.': countIndex,
        'Entity': element.enti_orga_name,
        'Unit': element.enti_loca_name,
        'Function': element.enti_dept_name,
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Manage_Entity_Mapping_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Entity',
      'Unit',
      'Function',
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.enti_orga_name,
        element.enti_loca_name,
        element.enti_dept_name,
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Manage_Entity_Mapping_Export_PDF');
    this.spinner.hide();
  }
}
