import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  
  constructor(private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let Menu = route.data.menu as string;
    if (this.isMenuAvailable(Menu)) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }

  public isMenuAvailable(Menu): boolean {
    let status = false;
    for (var key in JSON.parse(localStorage.getItem('user_info')).menu) {
      if(key == Menu){
        status = JSON.parse(localStorage.getItem('user_info')).menu[key];
      }
    }
    return status;
  }
}
