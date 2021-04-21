import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

import { constant } from '../../../constants/constant';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})

export class MyaccountComponent implements OnInit {
  user: any;
  editProfileForm: FormGroup;
  editPatrollerForm: FormGroup;
  changePasswordForm: FormGroup;
  enterOtpForm: FormGroup;

  options: any = constant.googlePlacesOption;
  disableSubmit: any;
  email: any;
  apiService: any;
  swalService: any;
  jwtService: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ){

    this.editProfileForm = fb.group({
      firstName: ['', Validators.compose([
        Validators.required,
      ])],
      lastName: ['', Validators.compose([
        Validators.required,
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(constant.regEx.emailRegEx)
      ])],
      countryCode: ['', Validators.compose([
        Validators.required,
      ])],
      mobileNumber: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  public get f() {
    return this.editProfileForm.controls;
  }

  editMyAccount(){
    if(!this.disableSubmit){
      this.disableSubmit = true;
      let obj = { userData: this.editProfileForm.value, previousEmail: this.email };
      this.apiService.editMyAccount(obj).subscribe(
        res=>{
          // console.log(res,'   res of update profile in my-account');
          if(res.success){
            this.setUserValues(res);
            this.swalService.showSuccess(res.message);
          }
          else{
            this.disableSubmit = false;
            this.swalService.showError(res.message);
          }
        },
        err=>{
          console.log(err,'  err');
          this.disableSubmit = false;
          this.swalService.showError(err.error.message);
        }
      );
    }
  }
  setUserValues(res: any) {
    throw new Error('Method not implemented.');
  }

  logUserOut(){
    this.jwtService.destroyToken();
    this.router.navigate(['/']);
  }

  ngOnInit(){
    console.log('New my-account component');
    this.apiService.goToTop();
  }

}
