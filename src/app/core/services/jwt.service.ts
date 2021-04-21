import { Injectable } from '@angular/core';
import { constant } from '../../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  saveToken(token : string){
    localStorage.setItem('jwtToken', token);
  }

  getToken() : string {
    return localStorage.getItem('jwtToken');
  }

  saveRole(role : string){
    localStorage.setItem('role', role);
  }

  getRole(){
    return localStorage.getItem('role');
  }

  destroyToken(){
    localStorage.clear();
  }

}
