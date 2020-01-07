import { Component } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Programistyczna pupa';

  constructor(private authService: AuthenticationService, private router: Router) { }

  signOut(event) {
    event.preventDefault();
    this.authService.signOutUser();
    this.router.navigate(['']);
  }

}
