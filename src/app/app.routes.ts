import {  Routes } from '@angular/router';
import {
  DeliveryRequestUpdateComponent
} from './features/delivery-request/components/delivery-request-update/delivery-request-update.component';
import { RegisterComponent } from './features/delivery-request/components/register/register.component';

export const routes: Routes = [
  {
    path: 'deliveryrequests/update/:id',
    pathMatch: 'full',
    component: DeliveryRequestUpdateComponent,
  },
  {
    path: 'Register',
    component: RegisterComponent
 }
];
