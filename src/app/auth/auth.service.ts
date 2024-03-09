import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false
  currentUser: any;

  constructor(private router: Router, private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.isAuthenticated = true;
      this.currentUser = JSON.parse(user);
    }
  }
  Users: any[] = []
  login(email: string, password: string) {
    return this.http.get<any>("http://localhost:3000/Users").toPromise()
      .then(res => {
        const user = res.find((a: any) => {
          return a.email === email && a.password === password;
        });
        if (user) {
          this.isAuthenticated = true;
          this.currentUser = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          return Promise.resolve(user);
        } else {
          return Promise.reject("User not found");
        }
      })
      .catch(err => Promise.reject("Something went wrong"));
  }
  register(registerForm: FormGroup) {
    const formData = registerForm.value;
    formData.role = 'user';
    return this.http.post<any>("http://localhost:3000/Users", formData)
      .toPromise()
      .then(res => {
        alert('Registration successful');
        this.router.navigate(['login']);
      })
      .catch(err => {
        alert('Registration failed');
        console.error('Registration failed:', err);
      });
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login'])
    this.isAuthenticated = false
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'admin';
  }
  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
  getUserName() {
    if (this.currentUser) {
      return this.currentUser.name;
    } else {
      return null;
    }
  }
  isAuthenticateds(): boolean {
    return this.isLoggedIn();
  }
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

}
