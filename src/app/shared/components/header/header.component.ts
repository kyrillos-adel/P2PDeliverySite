
import { RouterLink ,RouterLinkActive} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/User/Services/Login.auth.service';
import { NgIf } from '@angular/common';
import { UserProfileComponent } from '../../../features/User/Components/user-profile/user-profile.component';


@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf,UserProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  
}
