import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { UsersService } from 'src/app/services/Users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/Users/users';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-editusers',
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.css']
})
export class EditusersComponent implements OnInit {
  public usersData = new Users();
  public paramID = 0;

  public designationListFromAPI: any;
  public roleListFromAPI: any;
  public entityListFromAPI: any;
  public unitListFromAPI: any;
  public functionListFromAPI: any;
  public unitListBinding: any;
  public functionListBinding: any;

  public orga_id = 0;
  public loca_id = 0;
  public dept_id = 0;

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramID = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.onLoad();
  }

  onLoad() {
    this.spinner.show();

    this.usersService.getDesignationList().subscribe(
      res => {
        this.designationListFromAPI = res.data;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.designationListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.usersService.getEntityFunctionUnitList().subscribe(
      res => {
        this.entityListFromAPI = res.data.Entity;
        this.unitListFromAPI = res.data.Unit;
        this.functionListFromAPI = res.data.Function;

        this.unitListBinding = [];
        this.functionListBinding = [];

        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );

    this.usersService.getRoleList().subscribe(
      res => {
        this.roleListFromAPI = res.response.data;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.roleListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.usersService.getPerticularUsers(this.paramID).subscribe(
      res => {
        this.usersData.user_role_id = res.response.data.user_data.user_role_id;
        this.usersData.user_designation_id = res.response.data.user_data.user_designation_id;
        this.usersData = res.response.data.user_data;
        this.usersData.user_userpassword = '';

        this.orga_id = this.usersData.user_organization_id;
        this.loca_id = this.usersData.user_location_id;
        this.dept_id = this.usersData.user_department_id;

        this.unitListBinding = [];
        this.functionListBinding = [];
        this.usersData.user_location_id = 0;
        this.usersData.user_department_id = 0;
        this.usersData.isEnable = this.usersData.user_enable_status == '1' ? true : false;

        this.getEntityUnitFunctions();

        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );

  }

  getEntityUnitFunctions() {
    this.usersService.getEntityFunctionUnitList().subscribe(
      res => {
        this.entityListFromAPI = res.data.Entity;
        this.unitListFromAPI = res.data.Unit;
        this.functionListFromAPI = res.data.Function;

        // select unit
        this.unitListBinding = [];
        this.functionListBinding = [];

        for (let i = 0; i < this.unitListFromAPI.length; i++) {
          if (this.unitListFromAPI[i].orga_id == this.orga_id) {
            this.unitListBinding.push(this.unitListFromAPI[i]);
          }
        }

        this.usersData.user_location_id = this.loca_id;
        this.usersData.user_department_id = this.dept_id;

        // select function
        this.functionListBinding = [];

        for (let i = 0; i < this.functionListFromAPI.length; i++) {
          if (this.functionListFromAPI[i].loca_id == this.loca_id) {
            this.functionListBinding.push(this.functionListFromAPI[i]);
          }
        }

        this.usersData.user_department_id = this.dept_id;

        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );
  }

  changeUnit() {
    this.unitListBinding = [];
    this.functionListBinding = [];
    this.usersData.user_location_id = 0;
    this.usersData.user_department_id = 0;

    for (let i = 0; i < this.unitListFromAPI.length; i++) {
      if (this.unitListFromAPI[i].orga_id == this.usersData.user_organization_id) {
        this.unitListBinding.push(this.unitListFromAPI[i]);
      }
    }
  }

  changeFunction() {
    this.functionListBinding = [];
    this.usersData.user_department_id = 0;

    for (let i = 0; i < this.functionListFromAPI.length; i++) {
      if (this.functionListFromAPI[i].loca_id == this.usersData.user_location_id) {
        this.functionListBinding.push(this.functionListFromAPI[i]);
      }
    }
  }

  onSubmit() {
    let user_info = JSON.parse(localStorage.getItem('user_info'));
    let user_added_by = user_info.sess_role_id;
    this.spinner.show();
    const data = {
      user_id: this.paramID,
      user_username: this.usersData.user_username,
      profile_pic: '',
      user_added_by: user_added_by,
      user_address: this.usersData.user_address,
      user_approval_status: 'approved',
      user_created_at: '',
      user_default_password_changed: '0',
      user_department_id: this.usersData.user_department_id,
      user_designation_id: this.usersData.user_designation_id,
      user_email: this.usersData.user_email,
      user_employee_id: this.usersData.user_employee_id,
      user_enable_status: this.usersData.isEnable == true ? '1' : '0',
      user_first_name: this.usersData.user_first_name,
      user_last_name: this.usersData.user_last_name,
      user_location_id: this.usersData.user_location_id,
      user_mobile: this.usersData.user_mobile,
      user_organization_id: this.usersData.user_organization_id,
      user_report_to: 0,
      user_role_id: this.usersData.user_role_id,
      user_userpassword: this.usersData.user_userpassword
    };


    this.usersService.updateUsers(data).subscribe(
      resp => {
        this.alertify.success(`${resp.response.data.user_name} ${resp.response.message}`);
        this.spinner.hide();
        this.router.navigate(['users']);
      },
      error => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong`);
      }
    );
  }
  
  accessButton(id) {
    this.router.navigate([`/access-user/${id}`]);
  }

}
