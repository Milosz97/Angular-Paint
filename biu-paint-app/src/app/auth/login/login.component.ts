import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordLengthErrValidator } from '../../custom-validators/login-validator';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  private allowed: boolean;
  private submitted: boolean = false;

  private loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', [Validators.required]]
  }, { validators: passwordLengthErrValidator });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {

  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.submitted = true;
    }

    if (this.loginForm.valid) {
      this.authService.checkLoginInfo(this.loginForm.get('login').value, this.loginForm.get('password').value);
      this.allowed = this.authService.isLoggedIn;
      this.login();

    }
  }

  login() {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/login';
        this.router.navigateByUrl(redirect);
      }
    });

  }

}
