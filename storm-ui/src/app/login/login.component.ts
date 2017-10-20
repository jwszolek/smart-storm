import { Component, OnInit }         from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { AdvGrowlService } from 'primeng-advanced-growl';

import { Subscription } from 'rxjs/Subscription';
// import { TranslateService }	from '../translate';
import { UserService } from '../helpers/user.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
	private security_token: String;
	private sub: Subscription;
  model: any = {};
  loading = false;
  returnUrl: string;

	constructor(private route: ActivatedRoute,
      private growlService: AdvGrowlService,
      private router: Router, 
      private _user: UserService,
      // private translator: TranslateService
      )
	{}

 	ngOnInit(): void {
	  	// this.sub = this.route.queryParams.subscribe((params: Params) => {
			// window.sessionStorage.security_token = params['token'];
			// this._user.token = params['token'];
			// this._translate.use(params['lang'].substring(0,2));
      	// 	this.router.navigate(['/enbio']);
    	// });
  	}
  	ngOnDestroy() {
	    if(this.sub){
        this.sub.unsubscribe();
      }
	  }

    getToken(){
      return this.security_token;
    }

    login() {
        this.loading=true;
        // console.log(this.model);
        this.sub = this._user.login(this.model.email, this.model.password).subscribe(res => {
            console.log(res);
            this.loading = false;
            this.router.navigate(['/sensors']);
        },error => {
            console.log(error);
            this.growlService.createErrorMessage('login_error',error);
            this.loading=false;
        });
    }
}
