import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
})

export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  private readonly apiUrl = 'http://localhost:3000';

  register(): void {
    if (!this.username || !this.email || !this.password) {
      console.error('nieprawidlowe dane!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      console.error('Niepoprawny format adresu email!');
      return;
    }

    fetch(`${this.apiUrl}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.username, email: this.email, password: this.password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Rejestracja zakończona sukcesem:', data);
      })
      .catch((error) => {
        console.error('Błąd podczas rejestracji:', error);
      });
  }
}