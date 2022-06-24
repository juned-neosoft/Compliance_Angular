import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Document } from 'src/app/models/Document/document.model';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { Users } from 'src/app/models/Users/users';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { DocumentService } from 'src/app/services/Document/document.service';
import { UsersService } from 'src/app/services/Users/users.service';
import * as fileSaver from 'file-saver';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  dodumentForm = new Document();
  entityListFromAPI: any;
  unitListFromAPI: any;
  functionListFromAPI: any;
  usersData = new Users();

  unitListBinding: any;
  functionListBinding: any;

  ListUnit: any = [];
  listFunction: any = [];

  ListData = [];

  public Pagination = new Pagination();
  constructor(
    private usersService: UsersService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private documetService: DocumentService
  ) { }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.spinner.hide();
    this.BindGrid();
    this.BindSelectList();

  }

  BindGrid() {
    this.spinner.show();
    this.documetService.GetAllDocuments(this.dodumentForm).subscribe((data: any) => {
      this.ListData = data.response.data.AllTasks;
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        this.alertify.error("Data not found");
      })
  }

  BindSelectList() {
    this.spinner.show();
    this.usersService.getEntityFunctionUnitList().subscribe(
      res => {
        this.entityListFromAPI = res.data.Entity;
        this.unitListFromAPI = res.data.Unit;
        this.functionListFromAPI = res.data.Function;

        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );
  }

  changeUnit() {
    this.unitListBinding = [];
    this.functionListBinding = [];
    this.unitListBinding.push(this.unitListFromAPI.filter(x => x.orga_id == Number(this.dodumentForm.entity)));
    this.ListUnit = this.unitListBinding[0];
  }

  changeFunction() {
    this.functionListBinding = [];
    this.usersData.user_department_id = 0;
    this.functionListBinding.push(this.functionListFromAPI.filter(x => x.orga_id == Number(this.dodumentForm.unit)));
    this.listFunction = this.functionListBinding[0];
  }

  DownloadFile(docId, doc_name) {
    this.spinner.show();
    this.documetService.DownloadFile(docId).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', fileURL);
      link.setAttribute('download', doc_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      this.spinner.hide();
    });
  }




}
