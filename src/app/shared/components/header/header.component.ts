
import { RouterLink ,RouterLinkActive} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/User/Services/Login.auth.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,NgIf],
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

  logout() {
    this.authService.logout();
  }
}
