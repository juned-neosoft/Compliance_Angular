import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Roles } from 'src/app/models/Roles/roles';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { RolesService } from 'src/app/services/Roles/roles.service';

@Component({
  selector: 'app-editroles',
  templateUrl: './editroles.component.html',
  styleUrls: ['./editroles.component.css']
})
export class EditrolesComponent implements OnInit {

  editRoleForm=new Roles();
  EditId: any;
  
  constructor(private spinner: NgxSpinnerService, private router: Router, private roleService: RolesService,
    private alertify: AlertifyService, private activateRouter: ActivatedRoute) {
    this.EditId = this.activateRouter.snapshot.paramMap.get("id");
  }

  // constructor(private spinner: NgxSpinnerService, private router: Router, private roleService: RolesService,
  //   private alertify: AlertifyService, private activateRouter: ActivatedRoute) {
  //   this.EditId = this.activateRouter.snapshot.paramMap.get("id");
  // }

  ngOnInit() {
    this.spinner.hide();
    if (this.EditId > 0) {
      this.EditRole();
    }
  }

  EditRole() {
    this.spinner.show();
    this.roleService.EditRole(this.EditId).subscribe((resp:any) => {
     
        this.editRoleForm=resp.response.data.role;
        this.spinner.hide();
    
    },
      error => {
        this.spinner.hide();
        this.alertify.error("Something went to wrong");
      })
  }

  SubmitFrom() {
    this.spinner.show();
    this.roleService.UpdateRole(this.editRoleForm,this.EditId).subscribe((resp:any) => {
      if (resp.response.status == "Success") {
        setTimeout(() => {
          this.alertify.success("Role updated sucessfully");
          this.spinner.hide();
          this.router.navigate(["/roles"]);
        }, 1000);

      }
      else {
        this.spinner.hide();
        this.alertify.error("Role not updated");
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
        this.editRoleForm.user_role_name='';
        this.alertify.warning("This role already exists");
        this.spinner.hide();
      }
      else{
        this.spinner.hide();
      }
    },
    error=>{
      this.alertify.error("Something went to wrong");
    })
  }

}
