import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
  }),
};

@Injectable({
  providedIn: "root",
})
export class UserService {
  url: any = "http://localhost:4200/users/";
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();
  userSubject: any = new BehaviorSubject<any>(null);
  user: any = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(Username: string, Password: string): any {
    this.http
      .post(`${this.url}login`, { Username, Password }, httpOptions)
      .toPromise()
      .then((res: any) => {
        if (res && res.token) {
          sessionStorage.setItem("token", res.token);
          this.errorSubject.next(null);
          if (res.user) {
            this.userSubject.next(res.user);
          }
          this.router.navigateByUrl("dashboard");
        } else if (res.message) {
          this.errorSubject.next(res.message);
        }
      })
      .catch((err) => {
        console.log("LOGIN error = ", err);
        console.log(`LOGIN errorMessage = ${err.status} : ${err.statusText}`);
        console.log(
          `LOGIN errorMessage = ${err.status} : ${err.error.message}`
        );
        if (err.status === 504) {
          this.errorSubject.next(`${err.status} : ${err.statusText}`);
        } else {
          this.errorSubject.next(`${err.status} : ${err.error.message}`);
        }
      });
  }

  register(Username: string, Email: string, Password: string) {
    this.http
      .post(`${this.url}register`, { Username, Email, Password }, httpOptions)
      .toPromise()
      .then((res: any) => {
        console.log("REGISTER res = ", res);
        if (res && res.token) {
          sessionStorage.setItem("token", res.token);
          this.errorSubject.next(null);
          if (res.user) {
            console.log("REGISTER res.user = ", res.user);
            this.userSubject.next(res.user);
          }
          this.router.navigateByUrl("dashboard");
        } else if (res.message) {
          console.log("REGISTER res = ", res);

          this.errorSubject.next(res.message);
        }
      })
      .catch((err) => {
        console.log("REGISTER error = ", err);
        console.log(
          `REGISTER errorMessage = ${err.status} : ${err.statusText}`
        );
        console.log(
          `REGISTER errorMessage = ${err.status} : ${err.error.message}`
        );
        if (err.status === 504) {
          this.errorSubject.next(`${err.status} : ${err.statusText}`);
        } else {
          this.errorSubject.next(`${err.status} : ${err.error.message}`);
        }
      });
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem("jwt")) {
      return true;
    } else {
      return false;
    }
  }
}
