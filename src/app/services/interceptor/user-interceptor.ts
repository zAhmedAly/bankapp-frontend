import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";

import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtToken = sessionStorage.getItem("jwt");

    console.log("AuthInterceptor intercept jwtToken = ", jwtToken);

    const authRequest = req.clone();
    authRequest.headers.set("Authorization", "Bearer " + jwtToken);

    console.log("AuthInterceptor intercept authRequest = ", authRequest);

    return next.handle(authRequest);
  }
}
