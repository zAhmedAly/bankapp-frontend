import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../services/user/user.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  user: any = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  //   ngOnInit(): void {
  //     console.log("DashboardComponent || Inside ngOnInit");
  //     this.route.data.subscribe((data: { user: any }) => {
  //       console.log("DashboardComponent || data = ", data);

  //       this.user = data.user.user;
  //     });
  //   }
  // }

  ngOnInit(): void {
    this.userService.userSubject.subscribe((user) => {
      console.log("DashboardComponent || USER = ", user);
      this.user = user;
    });
  }
}
