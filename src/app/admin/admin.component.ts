import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../core/services/jwt.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;
    isAdmin: boolean;

    constructor(
        public router: Router,
        private jwtService: JwtService
    ) {}

    logUserOut(){
        this.jwtService.destroyToken();
        this.router.navigate(['/']);
    }
    ngOnInit(){
        console.log('layout component ngOnInit');
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
