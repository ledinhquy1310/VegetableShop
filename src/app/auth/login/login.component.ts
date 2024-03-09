import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup | any;
  isSubmitted = false;

  constructor(private authService: AuthService, private route: Router) { }

  submit() {
    this.isSubmitted = true;
    this.authService.login(this.login.value.email, this.login.value.password)
      .then(user => {
        this.route.navigate(['']);
      })
      .catch(err => {
        alert(err);
        this.route.navigate(['login']);
      });
  }

  ngOnInit(): void {
    this.login = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl()
    });
  }
}
