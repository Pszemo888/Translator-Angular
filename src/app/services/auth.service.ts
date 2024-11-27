import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null); // Przechowuje aktualnego użytkownika
  private authTokenKey = 'authToken'; 
  private userKey = 'user'; 

  constructor() {
    this.loadUserFromStorage(); // Załaduj dane użytkownika z localStorage przy inicjalizacji usługi
  }

  // Załaduj użytkownika z localStorage
  private loadUserFromStorage(): void {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  // Pobierz dane użytkownika jako Observable
  getUser() {
    return this.userSubject.asObservable();
  }
  getUserValue(): any {
    return this.userSubject.value;
  }

  // Pobierz token autoryzacyjny
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // Ustaw dane użytkownika i token w localStorage
  setUser(user: any, token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }
  isAdmin(): boolean {
    const user = this.getUserValue();
    return user && user.role === 'admin';
  }

  // Wylogowanie
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null); // Wyzeruj stan użytkownika
  }

  // Sprawdź, czy użytkownik jest zalogowany
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
