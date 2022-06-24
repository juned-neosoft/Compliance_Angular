import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) { }

  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    const router = this.injector.get(Router);

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(authService.getToken());
    const expirationDate = helper.getTokenExpirationDate(authService.getToken());
    const isExpired = helper.isTokenExpired(authService.getToken());

    if (decodedToken != null && expirationDate != null && isExpired) {
      authService.logoutUser();
    }

    const tokenRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });

    return next.handle(tokenRequest);
  }
}
