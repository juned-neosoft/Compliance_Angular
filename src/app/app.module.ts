import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ShellComponent } from './shell/shell.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { AlertifyService } from './services/Alertify/alertify.service';
import { EntityComponent } from './pages/entity/entity.component';
import { CreateentityComponent } from './pages/createentity/createentity.component';
import { EditentityComponent } from './pages/editentity/editentity.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { UndermaintenanceComponent } from './pages/undermaintenance/undermaintenance.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { UsersComponent } from './pages/users/users.component';
import { CreateusersComponent } from './pages/createusers/createusers.component';
import { EditusersComponent } from './pages/editusers/editusers.component';
import { UnitsComponent } from './pages/units/units.component';
import { CreateunitsComponent } from './pages/createunits/createunits.component';
import { EditunitsComponent } from './pages/editunits/editunits.component';
import { DesignationsComponent } from './pages/designations/designations.component';
import { CreatedesignationsComponent } from './pages/createdesignations/createdesignations.component';
import { EditdesignationsComponent } from './pages/editdesignations/editdesignations.component';
import { FunctionsComponent } from './pages/functions/functions.component';
import { CreatefunctionsComponent } from './pages/createfunctions/createfunctions.component';
import { EditfunctionsComponent } from './pages/editfunctions/editfunctions.component';
import { RolesComponent } from './pages/roles/roles.component';
import { ManageentitymappingsComponent } from './pages/manageentitymappings/manageentitymappings.component';
import { CreatemanageentitymappingsComponent } from './pages/createmanageentitymappings/createmanageentitymappings.component';
import { EditmanageentitymappingsComponent } from './pages/editmanageentitymappings/editmanageentitymappings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CompliancereportComponent } from './pages/compliancereport/compliancereport.component';
import { CompliancecertificateComponent } from './pages/compliancecertificate/compliancecertificate.component';
import { RepositoryComponent } from './pages/repository/repository.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { SupportComponent } from './pages/support/support.component';
import { ShowcausenoticeComponent } from './pages/showcausenotice/showcausenotice.component';
import { DocumentComponent } from './pages/document/document.component';
import { TaskmappingComponent } from './pages/taskmapping/taskmapping.component';
import { SubtaskComponent } from './pages/subtask/subtask.component';
import { ExportdataComponent } from './pages/exportdata/exportdata.component';
import { CommonemailComponent } from './pages/commonemail/commonemail.component';
import { LogsComponent } from './pages/logs/logs.component';
import { QuerybuilderComponent } from './pages/querybuilder/querybuilder.component';
import { CreateShowCauseNoticeComponent } from './pages/create-show-cause-notice/create-show-cause-notice.component';
import { CreaterolesComponent } from './pages/createroles/createroles.component';
import { EditrolesComponent } from './pages/editroles/editroles.component';
import { TaskmappingimporttaskComponent } from './pages/taskmapping/taskmappingimporttask/taskmappingimporttask.component';
import { TaskmappingimportedtaskComponent } from './pages/taskmapping/taskmappingimportedtask/taskmappingimportedtask.component';
import { TaskmappingassigntaskComponent } from './pages/taskmapping/taskmappingassigntask/taskmappingassigntask.component';
import { TaskmappingtaskconfigurationComponent } from './pages/taskmapping/taskmappingtaskconfiguration/taskmappingtaskconfiguration.component';
import { TaskmappingactivetaskComponent } from './pages/taskmapping/taskmappingactivetask/taskmappingactivetask.component';
import { TaskmappingenabledisableComponent } from './pages/taskmapping/taskmappingenabledisable/taskmappingenabledisable.component';
import { TaskmappingchangecomplianceownerComponent } from './pages/taskmapping/taskmappingchangecomplianceowner/taskmappingchangecomplianceowner.component';
import { TaskmappingdefaulttaskconfigurationComponent } from './pages/taskmapping/taskmappingdefaulttaskconfiguration/taskmappingdefaulttaskconfiguration.component';
import { TaskmappingdefaulttaskconfigurationrepositoryComponent } from './pages/taskmapping/taskmappingdefaulttaskconfigurationrepository/taskmappingdefaulttaskconfigurationrepository.component';
import { MappingListComponent } from './pages/mapping-list/mapping-list.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DashboardtaskdetailsComponent } from './pages/dashboardtaskdetails/dashboardtaskdetails.component';
import { StringFilterPipe } from './string-filter-pipe';
import { EditshowcausenoticeComponent } from './pages/editshowcausenotice/editshowcausenotice/editshowcausenotice.component';
import { ChangepasswordComponent } from './changepassword/changepassword/changepassword.component';
import { AccountprofileComponent } from './pages/accountprofile/accountprofile/accountprofile.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { LoginlogsComponent } from './pages/logs/loginlogs/loginlogs.component';
import { TaskassignComponent } from './pages/logs/taskassign/taskassign.component';
import { ChangecomplianceownerComponent } from './pages/logs/changecomplianceowner/changecomplianceowner.component';
import { TaskconfigurationComponent } from './pages/logs/taskconfiguration/taskconfiguration.component';
import { EmaillogsComponent } from './pages/logs/emaillogs/emaillogs.component';
import { ReportlogsComponent } from './pages/logs/reportlogs/reportlogs.component';
import { ActivedeactivetaskComponent } from './pages/logs/activedeactivetask/activedeactivetask.component';
import { TaskreactivationComponent } from './pages/logs/taskreactivation/taskreactivation.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NgApexchartsModule } from "ng-apexcharts";
import { OverallchartComponent } from './pages/Charts/overallchart/overallchart.component';
import { EntitychartComponent } from './pages/Charts/entitychart/entitychart.component';
import { UnitchartComponent } from './pages/Charts/unitchart/unitchart.component';
import { FunctionchartComponent } from './pages/Charts/functionchart/functionchart.component';
import { FinantialchartComponent } from './pages/Charts/finantialchart/finantialchart.component';
import { AccessUserComponent } from './pages/access-user/access-user.component';
import { RoleMenusComponent } from './pages/role-menus/role-menus.component';
import { ImportUsersComponent } from './pages/import-users/import-users.component';
import { ImportEntityComponent } from './pages/import-entity/import-entity.component';
import { ImportUnitComponent } from './pages/import-unit/import-unit.component';
import { ImportFunctionComponent } from './pages/import-function/import-function.component';
import { ImportManageEntityMappingComponent } from './pages/import-manage-entity-mapping/import-manage-entity-mapping.component';
import { ImportAssignTaskComponent } from './pages/import-assign-task/import-assign-task.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormatTimePipe } from './FormatTimePipe';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent,
    ShellComponent,
    HomeComponent,
    LoginComponent,
    ForgotpasswordComponent,
    EntityComponent,
    CreateentityComponent,
    EditentityComponent,
    UndermaintenanceComponent,
    PagenotfoundComponent,
    UsersComponent,
    CreateusersComponent,
    EditusersComponent,
    UnitsComponent,
    CreateunitsComponent,
    EditunitsComponent,
    DesignationsComponent,
    CreatedesignationsComponent,
    EditdesignationsComponent,
    FunctionsComponent,
    CreatefunctionsComponent,
    EditfunctionsComponent,
    RolesComponent,
    ManageentitymappingsComponent,
    CreatemanageentitymappingsComponent,
    EditmanageentitymappingsComponent,
    DashboardComponent,
    CompliancereportComponent,
    CompliancecertificateComponent,
    RepositoryComponent,
    CalendarComponent,
    SupportComponent,
    ShowcausenoticeComponent,
    DocumentComponent,
    TaskmappingComponent,
    SubtaskComponent,
    ExportdataComponent,
    CommonemailComponent,
    LogsComponent,
    QuerybuilderComponent,
    CreaterolesComponent,
    EditrolesComponent,
    CreateShowCauseNoticeComponent,
    TaskmappingimporttaskComponent,
    TaskmappingimportedtaskComponent,
    TaskmappingassigntaskComponent,
    TaskmappingtaskconfigurationComponent,
    TaskmappingactivetaskComponent,
    TaskmappingenabledisableComponent,
    TaskmappingchangecomplianceownerComponent,
    TaskmappingdefaulttaskconfigurationComponent,
    TaskmappingdefaulttaskconfigurationrepositoryComponent,
    MappingListComponent,
    DashboardtaskdetailsComponent,
    StringFilterPipe,
    EditshowcausenoticeComponent,
    ChangepasswordComponent,
    AccountprofileComponent,
    LoginlogsComponent,
    TaskassignComponent,
    ChangecomplianceownerComponent,
    TaskconfigurationComponent,
    EmaillogsComponent,
    ReportlogsComponent,
    ActivedeactivetaskComponent,
    TaskreactivationComponent,
    OverallchartComponent,
    EntitychartComponent,
    UnitchartComponent,
    FunctionchartComponent,
    FinantialchartComponent,
    AccessUserComponent,
    RoleMenusComponent,
    ImportUsersComponent,
    ImportEntityComponent,
    ImportUnitComponent,
    ImportFunctionComponent,
    ImportManageEntityMappingComponent,
    ImportAssignTaskComponent,
    FormatTimePipe
  ],
  imports: [
    BrowserModule,
    NgApexchartsModule,
    FullCalendarModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    AlertifyService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}

  ],
  bootstrap: [AppComponent],
  exports: [
    StringFilterPipe
  ]
})
export class AppModule { }
