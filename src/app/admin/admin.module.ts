import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '../core/core.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        NgbDropdownModule,
        ReactiveFormsModule,
        CoreModule,
    ],
    declarations: [
    ]
})
export class LayoutModule {}
