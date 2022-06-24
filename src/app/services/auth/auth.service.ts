import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  loginUser(data) {
    // return this.http.post<any>(this.baseUrl + 'authenticateUser', data);
    return this.http.post<any>(this.baseUrl + `authenticateUser?password=${data.password}&user_name=${data.user_name}`, data);
  }

  loggedIn() {
    return !!localStorage.getItem(`token`);
  }

  getToken() {
    return localStorage.getItem(`token`);
  }

  logoutUser() {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`user_info`);
    this.router.navigate(['/login']);
  }
}
