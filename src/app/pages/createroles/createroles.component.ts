import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Roles } from 'src/app/models/Roles/roles';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { RolesService } from 'src/app/services/Roles/roles.service';

@Component({
  selector: 'app-createroles',
  templateUrl: './createroles.component.html',
  styleUrls: ['./createroles.component.css']
})
export class CreaterolesComponent implements OnInit {
  addRoleForm=new Roles();
  
  constructor(private spinner: NgxSpinnerService, private router: Router, private roleService: RolesService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.spinner.hide();
  }
  // addRoleForm: FormGroup;
  // submitted:boolean=false;
  // constructor(private spinner: NgxSpinnerService, private router: Router, private roleService: RolesService,
  //   private alertify: AlertifyService) { }

  SubmitFrom() {
    this.spinner.show();
    this.roleService.SubmitRole(this.addRoleForm).subscribe((resp:any) => {
      if (resp.response.status == "Success") {
        setTimeout(() => {
          this.alertify.success("Role saved sucessfully");
          this.spinner.hide();
          this.router.navigate(["/roles"]);
        }, 1000);
      }
      else {
        this.spinner.hide();
        this.alertify.error("Role not saved");
      }
    },
      error => {
        this.spinner.hide();
        this.alertify.error("something went to wrong");
      })
  }

  onChangeEvent(event: any){
   
    this.spinner.show();
    this.roleService.CheckRoleExists(event.target.value).subscribe((resp:any)=>{
      if(resp.response.data.is_exists==true)
      {
        this.addRoleForm.user_role_name='';
        this.alertify.warning("This role already exists");
        this.spinner.hide();
      }
      else
      {
        this.spinner.hide();
      }
    },
    error=>{
      this.alertify.error("Something went to wrong");
    })
  }

}
