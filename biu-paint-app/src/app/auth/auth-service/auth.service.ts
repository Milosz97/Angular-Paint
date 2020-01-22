import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor() { }

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn)
    );
  }

  logout() {
    this.isLoggedIn = false;
  }

  checkLoginInfo(login: string, passwd: string) {
    if (login == 'admin' && passwd == 'admin124') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

}
