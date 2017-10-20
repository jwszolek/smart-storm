import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdvGrowlService } from 'primeng-advanced-growl';
import { UserService } from '../helpers/user.service';
// import { TranslateService } from '../translate';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
       private growlService: AdvGrowlService,
      // private translator: TranslateService
        // private alertService: AlertService
    ) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                  //this.alertService.success('Registration successful', true);
                  this.loading = false;
                  // console.log("success");
                  this.growlService.createSuccessMessage('Registration successful','');
                  this.router.navigate(['/login']);
                },
                error => {
                    // this.alertService.error(error);
                  // console.log("error");
                  this.growlService.createErrorMessage('register_error',error);
                  console.log("error");
                  this.loading = false;
                });
    }
}
