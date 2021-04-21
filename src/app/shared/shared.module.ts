import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgxCurrencyModule,
  ],
  exports: [
    NgxCurrencyModule,
  ]
})
export class SharedModule { }
