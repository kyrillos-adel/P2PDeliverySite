import {  Routes } from '@angular/router';
import { DeliveryRequestUpdateComponent } from './features/delivery-request/components/delivery-request-update/delivery-request-update.component';
import { UserDetailsComponent } from './features/User/Components/user-details/user-details.component';
import { EditUserComponent } from './features/User/Components/edit-user/edit-user.component';
import { AuthGuard } from './guards/auth.guard';
import { DeliveryRequestDetailsComponent } from './features/delivery-request/components/delivery-request-details/delivery-request-details.component';
import { DeliveryRequestCreationComponent } from './features/delivery-request/components/delivery-request-creation/delivery-request-creation.component';
import { HomeComponent } from './features/home/home/home.component';
import { DeliveryRequestsRetriveComponent } from './features/delivery-request/components/delivery-requests-retrive/delivery-requests-retrive.component';
import { RegisterComponent } from './features/User/Components/register/register.component';
import { LoginComponent } from './features/User/Components/login/login.component';
import { DeliveryRequestsByUserIdComponent } from './features/delivery-request/components/delivery-requests-by-user-id/delivery-requests-by-user-id.component';
import { DRApplictionsByUserIdComponent } from './features/DRApplication/components/drapplictions-by-user-id/drapplictions-by-user-id.component';
import { AddApplicationComponent } from './features/DRApplication/components/add-application/add-application.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'',
    component:HomeComponent,
  },
  {
    path: 'deliveryrequests/update/:id',
     pathMatch: 'full',
    component: DeliveryRequestUpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
    {
    path: 'deliveryrequests/details/:id',
    component: DeliveryRequestDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'deliveryrequests/Create',
    pathMatch: 'full',
     component: DeliveryRequestCreationComponent,
     canActivate: [AuthGuard],

  },
  {
    path:'deliveryrequests/getallDRs',
    pathMatch: 'full',
    component:DeliveryRequestsRetriveComponent,

  },
  {
    path: 'Register',
    component: RegisterComponent,
    pathMatch: 'full'
 },
 {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit-profile',
     component: EditUserComponent,
     canActivate: [AuthGuard],
     pathMatch: 'full'

  },
  {
    path:'deliveryrequests/getMyDeliveryRequests',
    pathMatch: 'full',
    component:DeliveryRequestsByUserIdComponent,
    canActivate: [AuthGuard],

  },
  {
    path:'DRApplications/GetMyApplications',
    pathMatch: 'full',
    component:DRApplictionsByUserIdComponent,
    canActivate: [AuthGuard],

  },
  {
    path:"Application/add",
    pathMatch:'full',
    component:AddApplicationComponent,
    canActivate: [AuthGuard],
  }
];
