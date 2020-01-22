import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  firebaseError: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.signInUser(this.loginForm.value.email, this.loginForm.value.password)
      .then(() => {
        this.router.navigate(['/courses']);
        this.loginForm.reset();
      })
      .catch(error => {
        console.log(error.message);
        this.firebaseError = error.message;
      });
    
  }
}
