import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";

import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  sendOtpForRegister(value: any) {
    throw new Error('Method not implemented.');
  }
  verifyOtpAndSignup(obj: { enteredOtp: any; otpToCompare: any; signUpData: any; }) {
    throw new Error('Method not implemented.');
  }
  token : String;

  constructor(
    private http : HttpClient,
    private router : Router,
    private jwtService : JwtService
  ){

  }

  getRole(){
    let token = this.jwtService.getToken();
    let decodedToken = jwt_decode(token);
    return decodedToken.role;
  }

  getHttpOptions(){
    let token = this.jwtService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token,
        'Access-Control-Allow-Origin' : '*'
      })
    };
    return httpOptions;
  }

  signUpRequest(signUpObject: any): Observable<any>{
    return this.http.post(`${environment.config.api_url}api/users/signup`, signUpObject);
  }

  signInRequest(signInObject: any): Observable<any>{
    return this.http.post(`${environment.config.api_url}api/users/signin`, signInObject);
  }

  forgotPassword(forgotPassword: any): Observable<any> {
    return this.http.post(`${environment.config.api_url}api/users/forgotpassword`, forgotPassword);
  }

  setPassword(paramsValue: any): Observable<any> {
    return this.http.post(`${environment.config.api_url}api/users/setpassword`, paramsValue);
  }

  getMyProfile(): Observable<any>{
    let httpOptions = this.getHttpOptions();
    return this.http.get(`${environment.config.api_url}api/users/getmyprofile`, httpOptions);
  }

}
