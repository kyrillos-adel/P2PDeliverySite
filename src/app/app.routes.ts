import {  Routes } from '@angular/router';
import {
  DeliveryRequestUpdateComponent
} from './features/delivery-request/components/delivery-request-update/delivery-request-update.component';
import { RegisterComponent } from './features/User/Components/register/register.component';
import { LoginComponent } from './features/User/Components/login/login.component';
import { HomeComponent } from './features/home/home/home.component';
import { UserDetailsComponent } from './features/User/Components/user-details/user-details.component';
export const routes: Routes = [
  { 
    path: '',
    component: HomeComponent
  },
  {
    path: 'deliveryrequests/update/:id',
    pathMatch: 'full',
    component: DeliveryRequestUpdateComponent,
  },
  { 
    path: 'user-details', 
    component: UserDetailsComponent 
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
];
