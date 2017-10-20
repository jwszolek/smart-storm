import { Component } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { UserService } from "./helpers/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private route: ActivatedRoute, private router: Router, private user: UserService){
   
	user.status.subscribe((user) => {
      this.userData = user;
    })
  }

  userData: any = { logged: false };

  checkLogged(){
    var user = this.userData;
    if(!user.logged){
      var user = this.user.userData; 
      //JSON.parse(localStorage.getItem('currentUser'));
      if(!user.logged) return false;
      else {
        this.userData = user;
        this.userData.logged = true;
      }
    }
    return true;
  }

  logButton() {

    if(this.checkLogged()){
      this.user.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }
  
  registerOption(){
    return this.userData.logged;
  }
  
  getActiveTab() : string {
    return this.router.url.slice(1);
  }

  loginStatus() {
    if(this.checkLogged()){
      return 'Logout';
    } else {
      return 'Sign in';
    }
  }
}
