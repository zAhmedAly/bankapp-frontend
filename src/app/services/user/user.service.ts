import { Injectable, EventEmitter } from "@angular/core";
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
  url: any = "http://localhost:4200/users";
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();
  userSubject: any = new BehaviorSubject<any>(null);
  user: any = this.userSubject.asObservable();

  authChanged: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router) {}

  login(Username: string, Password: string): any {
    this.http
      .post(`${this.url}/login`, { Username, Password }, httpOptions)
      .toPromise()
      .then((res: any) => {
        if (res && res.token) {
          console.log("LOGIN res = ", res);
          sessionStorage.setItem("jwt", res.token);
          this.errorSubject.next(null);
          if (res.user) {
            console.log("LOGIN res.user = ", res.user);
            this.userSubject.next(res.user);
            sessionStorage.setItem("userId", res.user.id);
            this.authChanged.emit(true);
          }
          this.router.navigateByUrl("dashboard");
        } else if (res.Message) {
          this.errorSubject.next(res.Message);
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
      .post(`${this.url}/register`, { Username, Email, Password }, httpOptions)
      .toPromise()
      .then((res: any) => {
        if (res && res.token) {
          console.log("REGISTER res = ", res);
          sessionStorage.setItem("jwt", res.token);
          this.errorSubject.next(null);
          if (res.user) {
            console.log("REGISTER res.user = ", res.user);
            this.userSubject.next(res.user);
            // sessionStorage.setItem("userId", res.user.ID);
          }
          this.router.navigateByUrl("dashboard");
        } else if (res.Message) {
          this.errorSubject.next(res.Message);
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

  getUser() {
    const userId = sessionStorage.getItem("userId");
    const jwtToken = sessionStorage.getItem("jwt");

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      }),
    };

    this.http
      .post(`${this.url}/${userId}`, null, httpOptions)
      .toPromise()
      .then((res: any) => {
        if (res && res.token) {
          console.log("getUser res = ", res);
          sessionStorage.setItem("jwt", res.token);
          this.errorSubject.next(null);
          console.log("getUser || res.user.id ", res.user.id);
          console.log("getUser ||  userId ", userId);

          if (res.user.id === Number(userId)) {
            console.log("getUser || User Matching");

            this.userSubject.next(res.user);
            this.router.navigateByUrl("dashboard");
          } else {
            console.log("getUser || User NOT Matching");

            this.router.navigateByUrl("login");
          }
        } else {
          console.log("getUser || getUser did not return value");

          this.router.navigateByUrl("login");
        }
      })
      .catch((err) => {
        console.log("getUser error = ", err);
        console.log(`getUser errorMessage = ${err.status} : ${err.statusText}`);
        console.log(
          `getUser errorMessage = ${err.status} : ${err.error.message}`
        );
        if (err.status === 504) {
          this.errorSubject.next(`${err.status} : ${err.statusText}`);
        } else {
          this.errorSubject.next(`${err.status} : ${err.error.message}`);
        }
        return false;
      });

    // return this.http.get(`${this.url}/${userId}`, reqHeader);
  }

  /**
   * Logout of Interface
   * @returns boolean
   */
  logOut(): boolean {
    sessionStorage.clear();
    this.authChanged.emit(false);
    this.router.navigateByUrl("/");
    return true;
  }
}
