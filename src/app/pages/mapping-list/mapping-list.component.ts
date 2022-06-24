import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MappingListService } from 'src/app/services/MappingList/mapping-list.service';

@Component({
  selector: 'app-mapping-list',
  templateUrl: './mapping-list.component.html',
  styleUrls: ['./mapping-list.component.css']
})
export class MappingListComponent implements OnInit {
  public Pagination = new Pagination();
  public responseData: any;
  
  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private mappingListService: MappingListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.mappingListService.getList().subscribe(
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
  gotoUsers(id) {
    this.router.navigate([`/edit-users/${id}`]);
  }
}
