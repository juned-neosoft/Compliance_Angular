import { AccessUserComponent } from './pages/access-user/access-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { CreateentityComponent } from './pages/createentity/createentity.component';
import { EditentityComponent } from './pages/editentity/editentity.component';
import { EntityComponent } from './pages/entity/entity.component';
import { HomeComponent } from './pages/home/home.component';
import { ShellComponent } from './shell/shell.component';
import { AuthGuard } from './auth.guard';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { UndermaintenanceComponent } from './pages/undermaintenance/undermaintenance.component';
import { FunctionsComponent } from './pages/functions/functions.component';
import { CreatefunctionsComponent } from './pages/createfunctions/createfunctions.component';
import { EditfunctionsComponent } from './pages/editfunctions/editfunctions.component';
import { UnitsComponent } from './pages/units/units.component';
import { CreateunitsComponent } from './pages/createunits/createunits.component';
import { EditunitsComponent } from './pages/editunits/editunits.component';
import { DesignationsComponent } from './pages/designations/designations.component';
import { CreatedesignationsComponent } from './pages/createdesignations/createdesignations.component';
import { EditdesignationsComponent } from './pages/editdesignations/editdesignations.component';
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
import { UsersComponent } from './pages/users/users.component';
import { CreateusersComponent } from './pages/createusers/createusers.component';
import { EditusersComponent } from './pages/editusers/editusers.component';
import { RolesComponent } from './pages/roles/roles.component';
import { CreaterolesComponent } from './pages/createroles/createroles.component';
import { EditrolesComponent } from './pages/editroles/editroles.component';
import { CreateShowCauseNoticeComponent } from './pages/create-show-cause-notice/create-show-cause-notice.component';
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
import { EditshowcausenoticeComponent } from './pages/editshowcausenotice/editshowcausenotice/editshowcausenotice.component';
import { ChangepasswordComponent } from './changepassword/changepassword/changepassword.component';
import { AccountprofileComponent } from './pages/accountprofile/accountprofile/accountprofile.component';
import { LoginlogsComponent } from './pages/logs/loginlogs/loginlogs.component';
import { TaskassignComponent } from './pages/logs/taskassign/taskassign.component';
import { ChangecomplianceownerComponent } from './pages/logs/changecomplianceowner/changecomplianceowner.component';
import { TaskconfigurationComponent } from './pages/logs/taskconfiguration/taskconfiguration.component';
import { EmaillogsComponent } from './pages/logs/emaillogs/emaillogs.component';
import { ReportlogsComponent } from './pages/logs/reportlogs/reportlogs.component';
import { ActivedeactivetaskComponent } from './pages/logs/activedeactivetask/activedeactivetask.component';
import { TaskreactivationComponent } from './pages/logs/taskreactivation/taskreactivation.component';
import { RolesGuard } from './roles.guard';
import { RoleMenusComponent } from './pages/role-menus/role-menus.component';
import { ImportUsersComponent } from './pages/import-users/import-users.component';
import { ImportEntityComponent } from './pages/import-entity/import-entity.component';
import { ImportUnitComponent } from './pages/import-unit/import-unit.component';
import { ImportFunctionComponent } from './pages/import-function/import-function.component';
import { ImportManageEntityMappingComponent } from './pages/import-manage-entity-mapping/import-manage-entity-mapping.component';
import { ImportAssignTaskComponent } from './pages/import-assign-task/import-assign-task.component';
// import { CreateusersComponent } from './pages/createusers/createusers.component';
// import { EditusersComponent } from './pages/editusers/editusers.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'under-maintenance', component: UndermaintenanceComponent },
  {
    path: '', component: ShellComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'entity', component: EntityComponent, canActivate: [RolesGuard], data: {menu: 'Entity'} },
      { path: 'create-entity', component: CreateentityComponent },
      { path: 'edit-entity/:id', component: EditentityComponent },
      { path: 'functions', component: FunctionsComponent, canActivate: [RolesGuard], data: {menu: 'Functions'} },
      { path: 'create-functions', component: CreatefunctionsComponent },
      { path: 'edit-functions/:id', component: EditfunctionsComponent },
      { path: 'import-functions', component: ImportFunctionComponent },
      { path: 'units', component: UnitsComponent, canActivate: [RolesGuard], data: {menu: 'Unit'} },
      { path: 'account-profile', component: AccountprofileComponent },
      { path: 'create-unit', component: CreateunitsComponent },
      { path: 'edit-units/:id', component: EditunitsComponent },
      { path: 'import-units', component: ImportUnitComponent },
      { path: 'change-password', component: ChangepasswordComponent },
      { path: 'designations', component: DesignationsComponent, canActivate: [RolesGuard], data: {menu: 'Designation'} },
      { path: 'create-designations', component: CreatedesignationsComponent },
      { path: 'edit-designations/:id', component: EditdesignationsComponent },
      { path: 'manageentitymappings', component: ManageentitymappingsComponent, canActivate: [RolesGuard], data: {menu: 'ManageEntityMappings'} },
      { path: 'create-manageentitymappings', component: CreatemanageentitymappingsComponent },
      { path: 'edit-manageentitymappings/:id', component: EditmanageentitymappingsComponent },
      { path: 'import-manageentitymappings', component: ImportManageEntityMappingComponent },
      { path: 'import-entity', component: ImportEntityComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'compliance-report', component: CompliancereportComponent, canActivate: [RolesGuard], data: {menu: 'ComplianceReport'} },
      { path: 'compliance-certificate', component: CompliancecertificateComponent, canActivate: [RolesGuard], data: {menu: 'ComplianceCertificate'} },
      { path: 'repository', component: RepositoryComponent, canActivate: [RolesGuard], data: {menu: 'Repository'} },
      { path: 'calendar', component: CalendarComponent, canActivate: [RolesGuard], data: {menu: 'Calendar'} },
      { path: 'support', component: SupportComponent, canActivate: [RolesGuard], data: {menu: 'Support'} },
      { path: 'show-cause-notice', component: ShowcausenoticeComponent, canActivate: [RolesGuard], data: {menu: 'ShowCauseNotice'} },
      { path: 'create-show-cause-notice', component: CreateShowCauseNoticeComponent },
      { path: 'edit-show-cause-notice/:id', component: EditshowcausenoticeComponent },
      { path: 'document', component: DocumentComponent, canActivate: [RolesGuard], data: {menu: 'Document'} },
      { path: 'task-mapping', component: TaskmappingComponent, canActivate: [RolesGuard], data: {menu: 'TaskMapping'} },
      { path: 'sub-task', component: SubtaskComponent },
      { path: 'export-data', component: ExportdataComponent, canActivate: [RolesGuard], data: {menu: 'ExportData'} },
      { path: 'common-email', component: CommonemailComponent },
      { path: 'logs', component: LogsComponent },
      { path: 'query-builder', component: QuerybuilderComponent },
      { path: 'users', component: UsersComponent, canActivate: [RolesGuard], data: {menu: 'Users'} },
      { path: 'create-users', component: CreateusersComponent },
      { path: 'edit-users/:id', component: EditusersComponent },
      { path: 'import-users', component: ImportUsersComponent },
      { path: 'access-user/:id', component: AccessUserComponent },
      { path: 'roles', component: RolesComponent, canActivate: [RolesGuard], data: {menu: 'Roles'} },
      { path: 'create-roles', component: CreaterolesComponent },
      { path: 'edit-roles/:id', component: EditrolesComponent },
      { path: 'creadentials-roles/:id', component: RoleMenusComponent },
      { path: 'task-mapping-import-task', component: TaskmappingimporttaskComponent },
      { path: 'task-mapping-imported-task', component: TaskmappingimportedtaskComponent },
      { path: 'task-mapping-assign-task', component: TaskmappingassigntaskComponent },
      { path: 'import-assign-task', component: ImportAssignTaskComponent },
      { path: 'task-mapping-task-configuration', component: TaskmappingtaskconfigurationComponent },
      { path: 'task-mapping-active-task', component: TaskmappingactivetaskComponent },
      { path: 'task-mapping-enable-disable', component: TaskmappingenabledisableComponent },
      { path: 'task-mapping-change-compliance-owner', component: TaskmappingchangecomplianceownerComponent },
      { path: 'task-mapping-default-task-configuration', component: TaskmappingdefaulttaskconfigurationComponent },
      { path: 'task-mapping-default-task-configuration-repository', component: TaskmappingdefaulttaskconfigurationrepositoryComponent },
      { path: 'mapping-list', component: MappingListComponent },
      { path: 'logs-login', component: LoginlogsComponent },
      { path: 'logs-task-assign', component: TaskassignComponent },
      { path: 'logs-change-compliance-owner', component: ChangecomplianceownerComponent },
      { path: 'logs-task-configuration', component: TaskconfigurationComponent },
      { path: 'logs-email', component: EmaillogsComponent },
      { path: 'logs-report', component: ReportlogsComponent },
      { path: 'logs-active-deactive', component: ActivedeactivetaskComponent },
      { path: 'logs-reactive', component: TaskreactivationComponent }
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  CreateShowCauseNoticeComponent,
  UndermaintenanceComponent,
  PagenotfoundComponent,
  EntityComponent,
  CreateentityComponent,
  EditentityComponent,
  HomeComponent,
  LoginComponent,
  ForgotpasswordComponent,
  HeaderComponent,
  FooterComponent,
  ShellComponent,
  FunctionsComponent,
  CreatefunctionsComponent,
  EditfunctionsComponent,
  UnitsComponent,
  CreateunitsComponent,
  EditunitsComponent,
  DesignationsComponent,
  CreatedesignationsComponent,
  EditdesignationsComponent,
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
  RolesComponent,
  CreaterolesComponent,
  EditrolesComponent,
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
  LoginlogsComponent,
  TaskassignComponent,
  ChangecomplianceownerComponent,
  TaskconfigurationComponent,
  EmaillogsComponent,
  ReportlogsComponent,
  ActivedeactivetaskComponent,
  TaskreactivationComponent

];
