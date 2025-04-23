
import { RouterLink ,RouterLinkActive} from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../features/User/Services/Login.auth.service';
import { NgIf } from '@angular/common';
import { UserProfileComponent } from '../../../features/User/Components/user-profile/user-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf,UserProfileComponent],
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
