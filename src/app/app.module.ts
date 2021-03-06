import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountBalanceComponent } from "./account-balance/account-balance.component";
import { RegisterComponent } from "./register/register.component";
import { UserInterceptor } from "./services/interceptor/user-interceptor";
import { AuthGuardGuard } from "./services/guards/auth-guard.guard";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AccountBalanceComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    AuthGuardGuard,
    //{ provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
