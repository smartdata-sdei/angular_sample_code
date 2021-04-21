import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { constant } from '../../constants/constant';

import { HomeComponent } from './home.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    // AccordionModule,
    NgxMaskModule.forRoot(),
  ],

  providers: [
  ],
})
export class HomeModule { }
