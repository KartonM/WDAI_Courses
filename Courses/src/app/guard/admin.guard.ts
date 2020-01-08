import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable(({
  providedIn: 'root'
}) as any)
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState$.pipe(map(state => {
          console.log("SPRAWDZAM");
          if (state !== null) {
            if (state.email === 'admin@admin.com') { return true;}
          }

          this.router.navigate(['/login']);
          return false;
        }
      )
    );
  }
}
