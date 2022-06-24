import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Pagination } from 'src/app/models/Pagination/pagination';
import { EntityService } from 'src/app/services/Entity/entity.service';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  public Pagination = new Pagination();
  public responseData: any;
  public TableFilter: string;

  constructor(
    private entityService: EntityService,
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
    this.entityService.getList().subscribe(
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
    this.router.navigate([`/edit-entity/${id}`]);
  }

  deleteButton(id) {
    this.spinner.show();
    this.entityService.deleteEntity(id).subscribe(
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
        'Entity Name': element.orga_name,
        'Parent': element.orga_parent_name,
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Entity_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      "Sr. No.",
      "Entity Name",
      "Parent"
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.orga_name,
        element.orga_parent_name
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Entity_Export_PDF');
    this.spinner.hide();
  }
}
