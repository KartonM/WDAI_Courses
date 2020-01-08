import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs/operators';

@Injectable(({
  providedIn: 'root'
}) as any)

export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState$.pipe(map(state => {
          console.log("SPRAWDZAM");
          if (state !== null) { return true; }

          this.router.navigate(['/login']);
          return false;
        }
      )
    );
  }
  
}
