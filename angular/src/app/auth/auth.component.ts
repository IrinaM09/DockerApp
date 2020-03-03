import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email: string;
  password: string;

  constructor(private service: ServiceService) {
  }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }
  
  signup() {
    this.service.signup().subscribe((res) => {
      console.log("Success")

    }, (err: HttpErrorResponse) => {
      console.log("error: " + err);

    });
  }

  login() {
    this.service.login(this.email, this.password).subscribe((res) => {
      console.log("Success")

    }, (err: HttpErrorResponse) => {
      console.log("error: " + err);

    });
  }
}
