import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Login.auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [NgIf],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user: any;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const name = params['name'];
      if (name) {
        this.authService.getUser(name).subscribe({
          next: (res) => {
            this.user = res.data; 
            this.error = '';
          },
          error: (err) => {
            this.user="";
            console.error('Error fetching user:', err);
            this.error = 'User not exist, please check the name you entered.';
          }
        });
      }
    });
  }
  
}