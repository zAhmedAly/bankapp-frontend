import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardGuard } from "./services/guards/auth-guard.guard";
import { UserResolverService } from "./services/user-resolver/user-resolver.service";

import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegisterComponent } from "./register/register.component";
import { AccountBalanceComponent } from "./account-balance/account-balance.component";

// const routes: Routes = [
//   { path: "", component: LoginComponent },
//   { path: "register", component: RegisterComponent },
//   { path: "dashboard", component: DashboardComponent }, //, canActivate: [AuthGuardGuard] }
//   { path: "accountBalance", component: AccountBalanceComponent },
// ];

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "accountBalance", component: AccountBalanceComponent },
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuardGuard],
    resolve: { user: UserResolverService },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
