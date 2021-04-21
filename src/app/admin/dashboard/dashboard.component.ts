import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { filter, debounce, debounceTime, distinctUntilKeyChanged, distinctUntilChanged } from 'rxjs/operators';

import * as moment from 'moment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];

    isAuthTokenValid: any;
    tokenExpDate: any;

    constructor(
        private router: Router
    ){
    }

    showUserTable(){
        this.router.navigate(['/user']);
    }

    setAuthTokenValue(res: any){
        this.isAuthTokenValid = res.data.authToken.isValid;
        this.tokenExpDate = res.data.authToken.refreshTokenExpiresOnDate;
    }

    ngOnInit(){
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
