import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
    ],
    declarations: [
        DashboardComponent,
    ]
})
export class DashboardModule {}
