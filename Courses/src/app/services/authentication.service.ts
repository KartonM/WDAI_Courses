import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/index';

@Injectable(({
  providedIn: 'root'
}) as any)

export class AuthenticationService {

  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth) { }

  getUser(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  signInUser(email:string, password:string) {
    var rtn = this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(() => console.log(this.getUser()));
    return rtn;
  }

  signUpUser(email: string, password: string) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signOutUser() {
    return this.fireAuth.auth.signOut();
  }

}
