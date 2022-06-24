import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Support } from 'src/app/models/Support/support.model';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { SupportService } from 'src/app/services/Support/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  support=new Support();

  constructor(private spinner:NgxSpinnerService,private alertify:AlertifyService
    ,private supportService:SupportService) { }

  ngOnInit() {
    this.spinner.hide();
    
  }

  SubmitFrom()
  {
    this.spinner.show();
    this.supportService.SaveSupport(this.support).subscribe((data:any)=>{

       if(data.response.status=="Success")
       {
         this.spinner.hide();
         this.alertify.success("Email Sent");
         this.support.Cname='';
         this.support.Cemail='';
         this.support.Cmobile='';
         this.support.Cmessage='';
       }
       else
       {
         this.spinner.hide();
         this.alertify.error("Email not Sent");
       }
    },
    error=>{
      this.spinner.hide();
      this.alertify.error("Something went to wrong");
    })
  }

}
