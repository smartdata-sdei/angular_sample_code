import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { constant } from 'src/constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  verifyEmailForm: FormGroup;
  user: any;
  resetPasswordForm: any;
  loginErrorMessage: string;
  submitted: boolean;
  apiService: any;
  disableSubmit: boolean;
  jwtService: any;

  constructor(
    public router: Router,
    private fb: FormBuilder,
  ){
    this.loginForm = fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(constant.regEx.emailRegEx)
      ])],
      password: ['', Validators.compose([
        Validators.required,
      ])]
    });

    this.resetPasswordForm = fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(constant.regEx.emailRegEx),
      ])],
    });
  }

  public get f() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.loginErrorMessage = '';
    if(!this.loginForm.valid){
      this.submitted = true;
    }
    else{
      this.apiService.signInRequest(this.loginForm.value).subscribe(
        res=>{
          if(res.success){
            console.log(res,'   success res of signin');
            this.user = res.data;
            this.verifyEmailForm.get('email').setValue(res.data.email);

            this.disableSubmit = false;
          }
          else{
            console.log(res,'   error res of signin');
            this.loginErrorMessage = res.message;
            // this.swalService.showError(res.message);
            this.disableSubmit = false;
          }
        },
        err=>{
          console.log(err,'   err in signin');
          this.loginErrorMessage = err.error.message;
        }
      );
    }
  }

  logUserOut(){
    this.jwtService.destroyToken();
    this.router.navigate(['/login']);
  }

  ngOnInit(){
    this.apiService.goToTop();
  }

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }

}
