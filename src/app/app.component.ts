import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import{AuthService} from './features/User/Services/Login.auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuthRoute: boolean = false;

  constructor(private router:Router) 
  {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthRoute = ['/login', '/Register'].includes(event.urlAfterRedirects);
      }
    });
  }
  title = 'P2PDeliveryClientSide';
}
