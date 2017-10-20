import { Injectable } from '@angular/core';
import { Location, LocationStrategy } from "@angular/common";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {CanActivate} from "@angular/router";
import {Subject} from "rxjs/Subject";
import { Router } from "@angular/router";

@Injectable()
export class UserService{
    language: string;
    token: string;
    userData: any = { logged: false };
    status: Subject<any> = new Subject<any>();

    constructor(private http: Http, private router: Router) {

    }

    login(username: string, password: string) {
      return this.http.post('/api/users/authenticate', { email: username, password: password })
        .map((response: Response) => {
          let user = response;
          if (user) {
            this.userData = user;
            this.userData.logged = true;
            this.status.next(this.userData);
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        });
    }

    create(user: any) {
      return this.http.post('/api/users/register', user);
    }

    logout() {
      localStorage.removeItem('currentUser');
      this.userData = { logged: false };
      this.status.next(this.userData);
      this.router.navigate(['/login']);
    }

    registerOption() {
      return true;
    }




}
