import { RouterLink ,RouterLinkActive} from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../features/User/Services/Login.auth.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../../../features/User/Components/user-profile/user-profile.component';
import {ChatIconComponent} from '../../../features/chat/components/chat-icon/chat-icon.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgIf, FormsModule, UserProfileComponent, HttpClientModule, ChatIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = true;
  searchQuery: string = '';
  user: any = null;
  respond: any = null;
  constructor(private authService: AuthService, private router: Router) {
    this.respond  = this.authService.response;
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  onSearch(event: Event) {
    event.preventDefault();

    if (this.searchQuery?.trim()) {
      this.router.navigate(['/user-details'], {
        queryParams: { name: this.searchQuery.trim() }
      });
    }
  }
}
