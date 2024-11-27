import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private authService: AuthService, private router: Router) {}


login(): void {
  if (!this.email || !this.password) {
    console.error('Email i hasło są wymagane!');
    return;
  }

  fetch(`${this.apiUrl}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: this.email, password: this.password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const { token, user } = data; 
      if (token && user) {
        this.authService.setUser(user, token);
        console.log('Zalogowano pomyślnie:');
        console.log('Dane użytkownika w localStorage:', user); 
        this.router.navigate(['/translator']); 
      } else {
        console.error('Brak tokena lub danych użytkownika w odpowiedzi serwera.');
      }
    })
    .catch((error) => {
      console.error('Błąd podczas logowania:', error);
    });
}
}