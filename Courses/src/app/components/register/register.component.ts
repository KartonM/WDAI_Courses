import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  firebaseError: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log(this.registerForm.value.email);
    console.log(this.registerForm.value.password);
    this.authService.signUpUser(this.registerForm.value.email, this.registerForm.value.password)
      .then(() => {
        this.router.navigate(['/login']);
        this.registerForm.reset();
      })
      .catch(error => {
        console.log(error.message);
        this.firebaseError = error.message;
      });
  }

}
