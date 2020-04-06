import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ServiceService } from 'src/service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  findCityCard: boolean;
  explorer: boolean;
  enterHit: boolean;
  cityName: string;
  bgImage: string;
  user: string;
  token: string;
  openWiki: boolean;
  url: SafeResourceUrl;

  user_cities; 
  recommended_cities = ["helsinki", "budapest", "paris"];

  constructor(
    private detectChange: ChangeDetectorRef,
    private service: ServiceService,
    private toastr: ToastrService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'location_city',
        sanitizer.bypassSecurityTrustResourceUrl('assets/location_city.svg'));
      iconRegistry.addSvgIcon(
        'mood',
        sanitizer.bypassSecurityTrustResourceUrl('assets/mood.svg'));
  }

  ngOnInit() {
    this.bgImage = '../../assets/sun.png';
    this.cityName = '';
    this.user = localStorage.getItem('email').split('@')[0];
    this.token = localStorage.getItem('accessToken');

    console.log("current user: " + this.user + ", " + this.token);
  }

  ngOnDestroy() {
  }

  onEnter(event) {
    this.cityName = event.target.value;
    this.enterHit = true;
    this.getWeatherData();
  }

  loadFindCityCard() {
    this.findCityCard = true;
  }

  closeFindCityCard() {
    this.findCityCard = false;
    this.enterHit = false;
  }

  loadExplorer() {
    this.explorer = true;
    this.openWiki = false;

    this.service.getCities(this.token).subscribe((res) => {
      console.log(res)
      this.user_cities = res.cities;

    }, (err: HttpErrorResponse) => {
      console.log("error: " + err);

      // default values
     this.user_cities = ["roma", "bucharest"];
    });
  }

  closeExplorer() {
    this.explorer = false;
  }

  openWikipedia(city: string) {
    this.openWiki = true;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://en.wikipedia.org/wiki/" + city);
  }

  getWeatherData() {
    console.log("city name: " + this.cityName)

    this.service.getWeatherData(this.cityName).subscribe((res) => {
      console.log(res)

      var state = res.weatherState;
      if (state == "rain") { this.bgImage = '../../assets/rain.png'; }
      if (state == "snow") { this.bgImage = '../../assets/snow.png'; }
      if (state == "sleet") { this.bgImage = '../../assets/sleet.png'; }
      if (state == "fog") { this.bgImage = '../../assets/fog.png'; }
      if (state == "sun") { this.bgImage = '../../assets/sun.png'; }
      if (state == "cold") { this.bgImage = '../../assets/cold.png'; }
      if (state == "wind") { this.bgImage = '../../assets/wind.png'; }

      document.getElementById("city").innerHTML = this.cityName + ' ' + res.temperature.toString() + '°';
      document.getElementById("description").innerHTML = res.description;
      document.getElementById("maxTemp").innerHTML = 'max: ' + res.maxTemperature.toString() + '°';
      document.getElementById("minTemp").innerHTML = 'min: ' + res.minTemperature.toString() + '°';

    }, (err: HttpErrorResponse) => {
      console.log("error: " + err);

      // default values
      document.getElementById("city").innerHTML = 'Bucharest 20°';
      document.getElementById("state").innerHTML = 'sunny';
      document.getElementById("maxTemp").innerHTML = 'max: 24°';
      document.getElementById("minTemp").innerHTML = 'min: 14°';
    });
  }

  addCity() {
    this.service.addCity(this.cityName, this.token).subscribe((res) => {
      console.log(res)

      this.toastr.info(null, 'We memorized this city for you', {
        tapToDismiss: true,
        positionClass: 'toast-bottom-center'
      });

    }, (err: HttpErrorResponse) => {
      console.log("error: " + err);

      // default values
      document.getElementById("city").innerHTML = 'Bucharest 20°';
      document.getElementById("state").innerHTML = 'sunny';
      document.getElementById("maxTemp").innerHTML = 'max: 24°';
      document.getElementById("minTemp").innerHTML = 'min: 14°';
    });
  }
}
