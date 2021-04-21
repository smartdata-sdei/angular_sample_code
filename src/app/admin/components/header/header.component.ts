import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { JwtService } from '../../../core/services/jwt.service';
import { ApiService } from '../../../core/services/api.service';
import { constant } from '../../../../constants/constant';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    constant: any = constant;
    isAdmin: boolean = false;
    isHost: boolean = false;
    isPatroller: boolean = false;
    isScrolled: boolean;

    constructor(
        public router: Router,
        private translate: TranslateService,
        private apiService: ApiService,
        private jwtService: JwtService
    ){
        this.router.events.subscribe(val => {
            if(val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()){
                this.toggleSidebar();
            }
        });
    }

    @HostListener('window:scroll', [])
    onWindowScroll(){
        const number = window.scrollY;
        if(number > 100){
            this.isScrolled = true;
        }
        else{
            this.isScrolled = false;
        }
    }

    goToHomepage(){
        this.router.navigate(['/']);
    }

    goToDashboard(){
        this.router.navigate(['/dashboard']);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    logUserOut() {
        this.jwtService.destroyToken();
        this.apiService.setRole(null);
        this.router.navigate(['/']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        let role = this.apiService.getRole();
        if(role == '1'){
            this.isAdmin = true;
        }
        else if(role == '2'){
            this.isHost = true;
        }
        else{
            this.isPatroller = true;
        }
    }
}
