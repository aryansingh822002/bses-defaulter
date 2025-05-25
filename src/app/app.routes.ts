import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { MasterComponent } from './components/master/master.component';
import { AllotmentComponent } from './components/allotment/allotment.component';
import { RecoveryReportComponent } from './components/recovery-report/recovery-report.component';
import { ActionTakenComponent } from './components/action-taken/action-taken.component';
import { CustomerCareComponent } from './components/customer-care/customer-care.component';
import { ReportComponent } from './components/report/report.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { bootstrapApplication } from '@angular/platform-browser';
import { PriorityIVRComponent } from './components/master/priority-ivr/priority-ivr.component';
import { UserMasterComponent } from './components/master/user-master/user-master.component';
import { RoleMasterComponent } from './components/master/role-master/role-master.component';
import { DefaulterAllocationMasterComponent } from './components/master/defaulter-allocation-master/defaulter-allocation-master.component';
import { AgencyAllocationMasterComponent } from './components/master/agency-allocation-master/agency-allocation-master.component';
import { CommissionMasterComponent } from './components/master/commission-master/commission-master.component';
import { AgencyMappingMasterComponent } from './components/master/agency-mapping-master/agency-mapping-master.component';
import { AgencyMasterComponent } from './components/master/agency-master/agency-master.component';
import { DivisionOfficeComponent } from './components/customer-care/division-office/division-office.component';
import { CallCenterComponent } from './components/customer-care/call-center/call-center.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'master',
        canActivate: [AuthGuard],
        data: { roles: ['Admin Role for Bucket Creation'] },
        children: [
          { path: '', component: DashboardComponent }, // Default master view
          { path: 'agency-master', component: AgencyMasterComponent },
          { path: 'agency-mapping-master', component: AgencyMappingMasterComponent },
          { path: 'commission-master', component: CommissionMasterComponent },
          { path: 'agency-allocation-master', component: AgencyAllocationMasterComponent },
          { path: 'defaulter-allocation-master', component: DefaulterAllocationMasterComponent },
          { path: 'role-master', component: RoleMasterComponent },
          { path: 'user-master', component: UserMasterComponent },
          { path: 'priority-ivr-master', component: PriorityIVRComponent },
        ],
      },
      { path: 'allotment', component: AllotmentComponent },
      { path: 'recovery-report', component: RecoveryReportComponent },
      { path: 'action-taken', component: ActionTakenComponent },
      {
        path: 'customer-care',
        children: [
          { path: '', component: CustomerCareComponent }, // Default customer care view
          { path: 'call-center', component: CallCenterComponent },
          { path: 'division-office', component: DivisionOfficeComponent }
        ]
      },
      { path: 'report', component: ReportComponent }
    ]
  },
  { path: '**', redirectTo: '' },
];

