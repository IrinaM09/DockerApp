import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ServiceService } from 'src/service.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(
    private detectChange: ChangeDetectorRef,
    private service: ServiceService) {
  }

  ngOnInit() {
    this.bgImage = '../../assets/sun.png';
    this.cityName = '';
  }

  ngOnDestroy() {
  }

  onEnter(event) {
    this.cityName = event.target.value;
    this.enterHit = true;
    this.getWeatherData(this.cityName);
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
  }

  closeExplorer() {
    this.explorer = false;
  }

  getWeatherData(cityName: string) {
    console.log("city name: " + this.cityName)

    this.service.getWeatherData(cityName).subscribe((res) => {
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
}
