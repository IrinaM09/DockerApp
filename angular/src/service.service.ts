import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WeatherInfo } from './app/models/weather-info';
import { User } from './app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private javaServerURL: string = "http://localhost:8080/";
  private pythonServerURL: string = "http://127.0.0.1:5002/";

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    console.log("sending to " + this.pythonServerURL + "login");

    var user = {
      "email": email,
      "password": password
    }

    return this.http.post<User>(this.pythonServerURL + "login", user);
  }

  signup(email: string, password: string) {
    console.log("sending to " + this.javaServerURL + "signup");

    var user = {
      "email": email,
      "password": password
    }

    return this.http.post<User>(this.javaServerURL + "signup", user);
  }

  getWeatherData(city: string) {
    console.log("sending to " + this.javaServerURL + "getWeatherInfo");

    let params = new HttpParams();
    params = params.append('cityName', city);

    return this.http.get<WeatherInfo>(this.javaServerURL + "getWeatherInfo", { params });
  }

  addCity(city: string, token: string) {
    console.log("sending to " + this.pythonServerURL + "add_city");

    var user = {
      "accessToken": token,
      "city": city
    }

    return this.http.post<User>(this.pythonServerURL + "add_city", user);
  }

  getCities(token: string) {
    console.log("sending to " + this.pythonServerURL + "get_cities");

    var user = {
      "accessToken": token
    }
    
    return this.http.post<User>(this.pythonServerURL + "get_cities", user);
  }
}
