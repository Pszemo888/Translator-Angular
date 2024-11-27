import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavbarComponent],
  template: `
    <h1>{{ title }}</h1>
    <app-navbar></app-navbar>
    <nav>
      <a routerLink="/translator" routerLinkActive="active">translator</a> | 
      <a routerLink="/history" routerLinkActive="active">historia</a>
      <a routerLink="/admin/manage" routerLinkActive="active">admin</a>
      <a routerLink="/registration" routerLinkActive="active">rejestracja</a>
      <a routerLink="/login" routerLinkActive="active">login</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
  nav {
    margin-bottom: 20px;
  }

  a {
    text-decoration: none;
    padding: 10px;
  }

  a.active {
    font-weight: bold;
    color: blue;
  }
  `],
})
export class AppComponent {
  title = 'translator';
  
}
