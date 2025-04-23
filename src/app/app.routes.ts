import { Routes } from '@angular/router';
import {
  DeliveryRequestUpdateComponent
} from './features/delivery-request/components/delivery-request-update/delivery-request-update.component';
import { DeliveryRequestDetailsComponent } from './features/delivery-request/components/delivery-request-details/delivery-request-details.component';
import { DeliveryRequestCreationComponent } from './features/delivery-request/components/delivery-request-creation/delivery-request-creation.component';
import { HomeComponent } from './features/home/home/home.component';

export const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path: 'deliveryrequests/update/:id',
    pathMatch: 'full',
    component: DeliveryRequestUpdateComponent,
  },
  {
    path: 'deliveryrequests/details/:id',
    component: DeliveryRequestDetailsComponent,
  },
  { path: 'deliveryrequests/Create',
    pathMatch: 'full',
     component: DeliveryRequestCreationComponent 
  }

  

];
