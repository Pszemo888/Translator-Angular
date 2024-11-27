import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styles: ``
})

export class NavbarComponent implements OnInit {
  username: string | null = null;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Nasłuchuj zmian stanu użytkownika
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.isAdmin = user.role === 'admin';
      } else {
        this.username = null;
        this.isAdmin = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    console.log('Wylogowano');
    this.router.navigate(['/login']); 
  }
}