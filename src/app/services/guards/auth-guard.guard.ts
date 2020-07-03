import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardGuard implements CanActivate {
  url = "http://localhost:4200/users";
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | any {
    const userId = sessionStorage.getItem("userId");
    const jwtToken = sessionStorage.getItem("jwt");

    console.log("AuthGuardGuard || userId = ", userId);
    console.log("AuthGuardGuard || jwtToken = ", jwtToken);

    const reqHeader = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      }),
    };
    console.log("AuthGuardGuard || Before this.userService.getUser()");

    if (userId && jwtToken) {
      console.log("AuthGuardGuard || Inside if (userId && jwtToken)");
      this.userService.getUser();
      return true;
    } else {
      console.log("AuthGuardGuard || No userId && jwtToken");
      this.router.navigateByUrl("login");
      return false;
    }
  }
}
