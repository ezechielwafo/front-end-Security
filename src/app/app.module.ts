import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {EmployeeService} from "./employee.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
      FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
      EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
