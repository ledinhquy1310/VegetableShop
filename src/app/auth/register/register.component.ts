import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signup: FormGroup | any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signup = new FormGroup({
      'name': new FormControl(),
      'email': new FormControl(),
      'phone': new FormControl(),
      'password': new FormControl(),
    });
  }

  submit() {
    this.authService.register(this.signup)
      .then(() => {
        this.signup.reset();
      })
      .catch(error => {
        console.error('Registration failed:', error);
      });
  }
}
