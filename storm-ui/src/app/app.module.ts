import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule, ConnectionBackend } from '@angular/http';

import { FormsModule }   from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { AdvGrowlModule } from 'primeng-advanced-growl';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { requestOptionsProvider }   from './helpers/default-request-options.service';

import { UserService } from './helpers/user.service';
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
    AdvGrowlModule
  ],
  providers: [
  requestOptionsProvider,
  	UserService,
    customHttpProvider,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
