import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './services/api.service';
import { JwtService } from './services/jwt.service';
import { NumberOnlyDirective } from './directives/number-only.directive';

@NgModule({
  declarations: [
    NumberOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberOnlyDirective
  ],
  providers: [
    ApiService,
    JwtService
  ]
})
export class CoreModule { }
