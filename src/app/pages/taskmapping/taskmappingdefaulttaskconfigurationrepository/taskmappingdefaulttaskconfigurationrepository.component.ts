import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskmappingimportedtaskService } from 'src/app/services/Taskmappingimportedtask/taskmappingimportedtask.service';


@Component({
  selector: 'app-taskmappingdefaulttaskconfigurationrepository',
  templateUrl: './taskmappingdefaulttaskconfigurationrepository.component.html',
  styleUrls: ['./taskmappingdefaulttaskconfigurationrepository.component.css']
})
export class TaskmappingdefaulttaskconfigurationrepositoryComponent implements OnInit {
  public Pagination = new Pagination();
  public responseData: any;
  public TableFilter: string;
  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private taskmappingimportedtaskService: TaskmappingimportedtaskService,
    private router: Router
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
    this.taskmappingimportedtaskService.getDefaultTaskConfiguration().subscribe(
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

}
