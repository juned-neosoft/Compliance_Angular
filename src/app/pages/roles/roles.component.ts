import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolesService } from 'src/app/services/Roles/roles.service';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  public Pagination = new Pagination();
  public responseData: any;
  public TableFilter: string;

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private rolesService: RolesService,
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
    this.rolesService.getList().subscribe(
      res => {

        this.spinner.hide();
        this.responseData = res.response.data;
        this.Pagination.TotalRecords = res.response.data.length;
      },
      err => {
        this.spinner.hide();
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );
  }

  editButton(id) {
    this.router.navigate([`/edit-roles/${id}`]);
  }

  deleteButton(id) {
    this.spinner.show();
    if (confirm("Do you really want to delete this record?")) {

      this.rolesService.deleteRole(id).subscribe(
        (res: any) => {
          if (res.response.status == "Success") {
            this.spinner.hide();
            this.alertify.success("Role deleted successfully");
            this.loadData();
          }
        },
        err => {
          this.spinner.hide();
          this.alertify.error(`Data not found`);
        }
      );
    }
  }

  exportExcel() {
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.responseData.forEach(element => {
      const obj = {
        'Sr. No.': countIndex,
        'Role Name': element.user_role_name,
        'Description': element.description,
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Roles_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Role Name',
      'Description',
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.user_role_name,
        element.description,
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Roles_Export_PDF');
    this.spinner.hide();
  }

  cridentialsButton(id) {
    this.router.navigate([`/creadentials-roles/${id}`]);
  }
}
