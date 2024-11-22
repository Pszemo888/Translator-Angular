import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  template: `
    <h1>{{ title }}</h1>
    <nav>
      <a routerLink="/" routerLinkActive="active">translator</a> | 
      <a routerLink="/history" routerLinkActive="active">historia</a>
      <a routerLink="/admin/manage" routerLinkActive="active">admin</a>
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
  title = 'translator-app';
}
