import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { JwtService } from '../../../core/services/jwt.service';
import { SwalService } from '../../../core/services/swal.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    isAdmin: boolean = false;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        private translate: TranslateService,
        public router: Router,
        private apiService: ApiService,
        private jwtService: JwtService,
        private swalService: SwalService,
        ) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    getMyProfile(){
        this.apiService.getMyProfile().subscribe(
            res=>{
                if(res.success){
                    if(res.data.role == '1'){
                        this.isAdmin = true;
                    }
                    else{
                        this.isAdmin = false;
                    }
                }
                else{
                    this.swalService.showError(res.message);
                }
            },
            err=>{
                this.swalService.showError(err.error.message);
            }
        );
    }

    getRole(){
        let role = this.apiService.getRole();
        if(role == 1){
            this.isAdmin = true;
        }
        else{
            this.isAdmin = false;
            this.collapsed = !this.collapsed;
            this.collapsedEvent.emit(this.collapsed);
        }
    }

    ngOnInit() {
        this.getRole();

        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
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

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    logUserOut() {
        this.jwtService.destroyToken();
        this.router.navigate(['/']);
    }
}
