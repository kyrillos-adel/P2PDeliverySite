import {  Routes } from '@angular/router';
import {
  DeliveryRequestUpdateComponent
} from './features/delivery-request/components/delivery-request-update/delivery-request-update.component';
import { RegisterComponent } from './features/User/Components/register/register.component';
import { LoginComponent } from './features/User/Components/login/login.component';

export const routes: Routes = [
  {
    path: 'deliveryrequests/update/:id',
    pathMatch: 'full',
    component: DeliveryRequestUpdateComponent,
  },
  {
    path: 'Register',
    component: RegisterComponent
 },
 {
    path: 'login',
    component: LoginComponent 
  },
];
