import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private javaServerURL: string = "http://localhost:4201/";
  private pythonServerURL: string = "http://127.0.0.1:5002/";

  constructor(private http: HttpClient) { }

  public login() {
    console.log("sending to " + this.javaServerURL + "login");

    return this.http.get(this.javaServerURL + "login", { responseType: 'text' });
  }
}
