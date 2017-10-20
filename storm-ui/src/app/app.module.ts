import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule, ConnectionBackend } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FormsModule }   from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { AdvGrowlModule } from 'primeng-advanced-growl';
import {DataTableModule,SharedModule,DialogModule,ButtonModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { requestOptionsProvider }   from './helpers/default-request-options.service';

import { UserService } from './helpers/user.service';
import { DataService } from './helpers/data.service';
import { customHttpProvider } from "./helpers/custom-http";
import { AuthGuard } from "./helpers/auth.guard";

import { SensorsComponent } from './sensors/sensors.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SensorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    AdvGrowlModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule
  ],
  providers: [
  requestOptionsProvider,
  	UserService,
    DataService,
    customHttpProvider,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
