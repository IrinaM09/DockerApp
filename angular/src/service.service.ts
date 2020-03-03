import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private javaServerURL: string = "http://localhost:4201/";
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

  signup() {
    console.log("sending to " + this.javaServerURL + "signup");

    return this.http.get(this.javaServerURL + "signup", { responseType: 'text' });  
  }
}
