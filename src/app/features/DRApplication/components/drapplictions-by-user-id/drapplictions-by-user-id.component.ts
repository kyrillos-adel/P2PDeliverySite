import { Component ,OnInit} from '@angular/core';
import { DRApplicationDto } from '../../../../models/DRApplication/DR-Application.dto';
import { AuthService } from '../../../User/Services/Login.auth.service';
import { DRApplicationService } from '../../services/drapplication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drapplictions-by-user-id',
  imports: [CommonModule],
  templateUrl: './drapplictions-by-user-id.component.html',
  styleUrl: './drapplictions-by-user-id.component.css'
})
export class DRApplictionsByUserIdComponent implements  OnInit{

  DrApplications:DRApplicationDto[]=[];
  constructor(private drApplicationService :DRApplicationService
    ,private authService:AuthService
   )
   {}

   ngOnInit() {
    this.drApplicationService.getMyApplications().subscribe({
      next:(response)=>{
        if(response.isSuccess)
        {
          this.DrApplications=response.data;
          console.log(this.DrApplications);

        }
        else{
          console.error('Error fetching DR Applications',response.message);

        }
      },
      error:(err)=>{
        console.error('Request Faild :',err)
      }
    });
     
   }

}
