import { Component } from "@angular/core";
import { UserService } from "./services/user/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "banking-app-frontend";

  authedUser: boolean = false;

  isLoggedIn = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isLoggedInSubject.subscribe((status) => {
      console.log("AppComponent ngOnInit || STATUS = ", status);
      this.isLoggedIn = status;
    });

    this.userService.authChanged.subscribe((user) => {
      // user will be false if logged out
      // or user object if logged in.
      this.authedUser = user;
      console.log("AppComponent ngOnInit || authChanged = ", this.authedUser);
    });
  }
}
