import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  authedUser: boolean = false;

  isLoggedIn = false;

  constructor(private router: Router, private userService: UserService) {
    this.userService.isLoggedInSubject.subscribe((status) => {
      console.log("NavbarComponent ngOnInit || STATUS = ", status);
      this.isLoggedIn = status;
    });

    this.userService.authChanged.subscribe((user) => {
      // user will be false if logged out
      // or user object if logged in.
      this.authedUser = user;
      console.log(
        "NavbarComponent constructor || authChanged = ",
        this.authedUser
      );
    });
  }

  ngOnInit(): void {
    this.userService.isLoggedInSubject.subscribe((status) => {
      console.log("NavbarComponent ngOnInit || STATUS = ", status);
      this.isLoggedIn = status;
    });

    this.userService.authChanged.subscribe((user) => {
      // user will be false if logged out
      // or user object if logged in.
      this.authedUser = user;
      console.log(
        "NavbarComponent ngOnInit || authChanged = ",
        this.authedUser
      );
    });
  }

  doLogOut() {
    this.userService.logOut();
  }
}
