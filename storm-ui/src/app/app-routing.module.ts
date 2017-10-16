import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./helpers/auth.guard";
import { RegisterComponent } from "./register/register.component";

import { SensorsComponent } from './sensors/sensors.component';

const routes: Routes = [
  { path: '', redirectTo: 'sensors', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'sensors', component: SensorsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
