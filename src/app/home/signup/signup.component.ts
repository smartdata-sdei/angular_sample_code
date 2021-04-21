import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { constant } from '../../../constants/constant';

import { ApiService } from '../../core/services/api.service';
import { JwtService } from '../../core/services/jwt.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  patrollerSignUpForm: FormGroup;
  submitted: boolean;
  mobileOtp: any;
  display: boolean;
  isError: boolean;
  disableSubmit: boolean;
  errorMessage: any;
  submitted3: boolean;
  disableSubmit2: boolean;
  invalidOtp: boolean;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private jwtService: JwtService,
  ){


    this.signUpForm = fb.group({
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
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(constant.regEx.passwordRegEx)
      ])],
      countryCode: ['+1', Validators.compose([
        Validators.required,
      ])],
      mobileNumber: ['', Validators.compose([
        Validators.required
      ])],
      role: ['3', Validators.compose([
        Validators.required,
      ])]
    });
  }

  public get f() {
    return this.signUpForm.controls;
  }

  goToHomePage(){
    this.router.navigate(['/']);
  }

  signUserUp(){
    console.log(this.signUpForm.value,'    sign up form value before create user');
    this.disableSubmit2 = true;
    this.invalidOtp = false;
    this.apiService.signUpRequest(this.signUpForm.value).subscribe(
      res=>{
        if(res.success){
          console.log(res,'   success res of signup');
          this.jwtService.saveRole(res.role);
          localStorage.setItem('isLoggedin', 'true');
          if(res.role == '3'){
              this.router.navigate(['/']);
          }
          else{
              this.router.navigate(['/dashboard']);
          }
        }
        else{
          console.log(res,'   error res of signup');
        }
      },
      err=>{
        console.log(err,'   err in signup');
      }
    );
  }

  logUserOut(){
    this.jwtService.destroyToken();
    this.router.navigate(['/signup']);
  }

  ngOnInit(){
  }

}
