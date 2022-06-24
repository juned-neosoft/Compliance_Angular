import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Pagination } from '../../models/Pagination/pagination';
import { UsersService } from 'src/app/services/Users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/Users/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-user',
  templateUrl: './access-user.component.html',
  styleUrls: ['./access-user.component.css']
})
export class AccessUserComponent implements OnInit {
  public usersData = new Users();
  public Pagination = new Pagination();
  public paramID = 0;
  public orga_id = 0;
  public loca_id = 0;
  public dept_id = 0;
  public AccessRemaining: any;
  public access_set: any;
  public unitListFromAPI: any;
  public functionListFromAPI: any;
  public unitListBinding: any;
  public functionListBinding: any;
  public TableFilter: string;


  public originalEntityList=[];
  public checkDuplicateEntity=[];
  public entityList=[];
  
  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.TableFilter = '';
    this.paramID = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.onLoad();
    
    
  }

  onLoad() {
    this.spinner.show();

    this.usersService.getuseraccess(this.paramID).subscribe(
      res => {
        this.AccessRemaining = res.response.data.access_remaining;
        this.access_set = res.response.data.access_set;
        this.Pagination.TotalRecords = res.response.data.access_set.length;
        this.originalEntityList=[];
        this.checkDuplicateEntity=[];
        this.entityList=[];
        this.entityList = this.removeDuplicates(this.AccessRemaining, "orga_id");
        this.unitListBinding = [];
        this.functionListBinding = [];

        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );

  

    this.usersService.getPerticularUsers(this.paramID).subscribe(
      res => {
        this.usersData = res.response.data.user_data;
       
        this.orga_id = this.usersData.user_organization_id;
        this.loca_id = this.usersData.user_location_id;
        this.dept_id = this.usersData.user_department_id;

        this.unitListBinding = [];
        this.functionListBinding = [];
        this.usersData.user_organization_id = 0;
        this.usersData.user_location_id = 0;
        this.usersData.user_department_id = 0;

       // this.getEntityUnitFunctions();

        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );
    
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}
  

  getEntityUnitFunctions() {

    //console.log(this.AccessRemaining);
    this.usersService.getEntityFunctionUnitList().subscribe(
      res => {
        //this.entityListFromAPI = res.data.Entity;
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

    for (let i = 0; i < this.AccessRemaining.length; i++) {
       if (this.AccessRemaining[i].orga_id == this.usersData.user_organization_id) {
        this.unitListBinding.push(this.AccessRemaining[i]);
      }
    }
    this.unitListBinding = this.removeDuplicates(this.unitListBinding, "loca_id");
  }

  changeFunction() {
    this.functionListBinding = [];
    this.usersData.user_department_id = 0;
    console.log(this.usersData);
    var userdata = this.usersData.user_location_id2;
    for (let i = 0; i < this.AccessRemaining.length; i++) {
      for (let j = 0; j < userdata.length; j++) {

        if (this.AccessRemaining[i].loca_id == this.usersData.user_location_id2[j]) {
          this.functionListBinding.push(this.AccessRemaining[i]);
        }
      }
    }

    this.functionListBinding = this.removeDuplicates(this.functionListBinding, "dept_id");
    

  }
  
  onSubmit(){
      //console.log(this.usersData);
      let mapping_lists = [];
      let lists = [];
      for (let i = 0; i < this.usersData.user_location_id2.length; i++) {
      //   if (this.usersData.user_location_id[i] == this.usersData.user_organization_id) {
      //    this.unitListBinding.push(this.AccessRemaining[i]);
      //  }
       
          const lists = {
            umap_orga_id : Number(this.usersData.user_organization_id),
            umap_loca_id : Number(this.usersData.user_location_id2[i]),
            umap_dept_id : Number(this.usersData.user_department_id)
          }
          
          mapping_lists.push(lists);
      }
      let user_info = JSON.parse(localStorage.getItem('user_info'));

      const data={
        umap_loca : [],
        umap_dept : null,
        mapping_list:mapping_lists,
        umap_user_id: this.usersData.user_id,
        user_id: this.usersData.user_id,
        user_first_name: this.usersData.user_first_name,
        user_last_name: this.usersData.user_last_name

      }
      
     this.usersService.updateUserAceess(data).subscribe(
      resp => {
        this.alertify.success(`${resp.response.message}`);
        this.spinner.hide();
        // this.router.navigate(['users']);

        this.usersData.user_organization_id = 0;
        this.usersData.user_location_id2 = 0;
        this.usersData.user_department_id = 0;

        this.unitListBinding = [];
        this.functionListBinding = [];

        this.onLoad();
      },
      error => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong`);
      }
    );


  }
  removeUserAccess(id){

      console.log(this.usersData);
      console.log(id);

     // {umap_ids: [{umap_id: 9292, umap_orga_id: 4, umap_loca_id: 102, umap_dept_id: 10}], umap_user_id: 470}


      const data = {
        umap_ids:[{
          umap_id:id,
          umap_orga_id:this.usersData.user_organization_id,
          umap_loca_id:this.usersData.user_location_id,
          umap_dept_id:this.usersData.user_department_id
        }],
        umap_user_id:this.usersData.user_id
      };

    
      console.log(data);
      
     this.usersService.removeUserAccess(data).subscribe(
      resp => {
        this.alertify.success(`User access removed successfully.`);
        this.spinner.hide();
        this.router.navigate(['users']);
      },
      error => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong`);
      }
    );


  }


}
