import { Routes } from '@angular/router';
import {
  DeliveryRequestUpdateComponent
} from './features/delivery-request/components/delivery-request-update/delivery-request-update.component';
import { DeliveryRequestDetailsComponent } from './features/delivery-request/components/delivery-request-details/delivery-request-details.component';

export const routes: Routes = [
  {
    path: 'deliveryrequests/update/:id',
    pathMatch: 'full',
    component: DeliveryRequestUpdateComponent,
  },
  {
    path: 'deliveryrequests/details/:id',
    component: DeliveryRequestDetailsComponent,
  }

];
