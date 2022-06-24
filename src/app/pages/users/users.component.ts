import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Pagination } from '../../models/Pagination/pagination';
import { UsersService } from '../../services/Users/users.service';
import { AlertifyService } from '../../services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public Pagination = new Pagination();
  public responseData: any;
  public TableFilter: string;

  constructor(
    private usersService: UsersService,
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
    this.usersService.getList().subscribe(
      res => {
        console.log(res.response.data.all_users);
        this.spinner.hide();
        //this.responseData = res.data;
        this.responseData = res.response.data.all_users;
        this.Pagination.TotalRecords = res.response.data.all_users.length;
      },
      err => {
        this.spinner.hide();
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );
  }

  editButton(id) {
    this.router.navigate([`/edit-users/${id}`]);
  }

  exportExcel() {
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.responseData.forEach(element => {
      const obj = {
        'Sr. No.': countIndex,
        'First Name': element.user_first_name,
        'Last Name': element.user_last_name,
        'Email': element.user_email,
        'Username': element.user_username,
        'User Role': element.user_role_id,
        'Status': element.user_enable_status == 1 ? 'Enable' : 'Disable',
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Users_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      "Sr. No.",
      "First Name",
      "Last Name",
      "Email",
      "Username",
      "User Role",
      "Status"
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.user_first_name,
        element.user_last_name,
        element.user_email,
        element.user_username,
        element.user_role_id,
        element.user_enable_status == 1 ? 'Enable' : 'Disable',
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Users_Export_PDF');
    this.spinner.hide();
  }
}
