import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { constant } from '../../../constants/constant';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  selected: any;

  searchPlaceForm: FormGroup;
  searchByZoneNumberForm: FormGroup;
  latitude = 37.09024;
  longitude = -95.71289100000001;
  predictions: any;
  apiService: any;
  isZoneFound: any;
  parkingLot: any;
  formattedAddress: any;
  swalService: any;
  activatedRoute: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  )
  {
    this.searchByZoneNumberForm = this.fb.group({
      zone: ['', Validators.compose([
          Validators.required,
      ])],
    });

    this.searchPlaceForm = this.fb.group({
      location: ['', Validators.compose([
          Validators.required,
      ])],
    });
  }

  gotoSearchPage(){
    let selected = {};
    this.predictions.forEach(element => {
        if(element.description === this.selected){
          selected = element;
        }
    });
    let place_id = selected['place_id'];
    this.apiService.getLatLongByPlaceId(place_id).subscribe(
      res=>{
        // console.log(res);
        if(res.success){
          this.latitude = res.data.location.lat;
          this.longitude = res.data.location.lng;
          this.router.navigate(['/search'], { queryParams: { latitude: this.latitude, longitude: this.longitude } });
        }
        else{
          // console.log('Data not found');
          if(this.isZoneFound){
            this.router.navigate(['/search'], { queryParams: { zone: this.parkingLot.zone } });
          }
        }
      },
      err=>{
        console.log(err);
      }
    );
  }

  public get f() {
    return this.searchByZoneNumberForm.controls;
  }

  goToSignIn(){
    this.router.navigate(['/login']);
  }

  public handleAddressChange(address: any) {
    console.log(address,'    address');
    this.formattedAddress = address.formatted_address;

    this.searchPlaceForm.get('location').setValue(this.formattedAddress);
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    this.router.navigate(['/search'], { queryParams: { latitude: this.latitude, longitude: this.longitude } });

    // this.setLatLngInForm(this.latitude, this.longitude);
  }
  
  getMyProfile(){
    this.apiService.getMyProfile().subscribe(
      res=>{
        console.log(res, '   res of getMyProfile in homepage component');
        if(res.success){
            if(res.data.role != '3'){
              this.router.navigate(['/dashboard']);
            }
        }
        else{
            this.logUserOut();
        }
      },
      err=>{
          this.logUserOut();
      }
    );
  }
  logUserOut() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.howitworks == 'true'){
        window.scroll({
          top: 600,
          left: 0,
          behavior: 'smooth'
        });
      }
    });

  }

}
