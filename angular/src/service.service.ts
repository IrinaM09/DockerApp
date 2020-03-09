import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    return this.http.post(this.pythonServerURL + "login", user, { responseType: 'text' });  
  }

  signup(email: string, password: string) {
    console.log("sending to " + this.javaServerURL + "signup");
   
    var user = {
      "email": email,
      "password": password
    }

    return this.http.post(this.javaServerURL + "signup", user, { responseType: 'text' });  
  }
}
