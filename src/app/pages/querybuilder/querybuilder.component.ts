import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { QuerybuilderService } from 'src/app/services/QueryBulder/querybuilder.service';

@Component({
  selector: 'app-querybuilder',
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.css']
})
export class QuerybuilderComponent implements OnInit {
  
  varTaskDelete:string='';
  varTaskDeactivate:string='';
  varTaskDesable:string='';
  constructor(
    private spinner:NgxSpinnerService,
    private queryService:QuerybuilderService,
    private alertify:AlertifyService
  ) { }

  ngOnInit() {
    this.spinner.hide();
  }

  TaskDeleteQuery()
  {
   this.spinner.show();
   
   this.queryService.DeleteTask(this.varTaskDelete).subscribe((data:any)=>{
      if(data.response.status=="Success")
      {
        this.alertify.success("Query run successfully.");
        this.varTaskDelete="";

      }
      else
      {
        this.alertify.error("Query not run successfully.");
       
      }
     this.spinner.hide();
   },
   error=>{
    this.alertify.error("Query not run successfully.");

     this.spinner.hide();
   })
  }

  TaskDeActivationQuery()
  {
   this.spinner.show();
   
   this.queryService.DeActivationTask(this.varTaskDeactivate).subscribe((data:any)=>{
      if(data.response.status=="Success")
      {
        this.alertify.success("Query run successfully.");
        this.varTaskDeactivate="";

      }
      else
      {
        this.alertify.error("Query not run successfully.");
       
      }
     this.spinner.hide();
   },
   error=>{
    this.alertify.error("Query not run successfully.");

     this.spinner.hide();
   })
  }

  TaskDesableQuery()
  {
   this.spinner.show();
   
   this.queryService.DesableTask(this.varTaskDesable).subscribe((data:any)=>{
      if(data.response.status=="Success")
      {
        this.alertify.success("Query run successfully.");
        this.varTaskDesable="";

      }
      else
      {
        this.alertify.error("Query not run successfully.");
       
      }
     this.spinner.hide();
   },
   error=>{
    this.alertify.error("Query not run successfully.");

     this.spinner.hide();
   })
  }

}
