import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email: string;
  password: string;

  constructor(
  private router: Router,
  private service: ServiceService) {
  }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  login() {
    this.service.login(this.email, this.password).subscribe((res) => {
      console.log(res)

      if (res.accessToken !== undefined) {
        localStorage.setItem('email', res.email);
        localStorage.setItem('accessToken', res.accessToken);
        this.router.navigateByUrl("/home"); // Main page
      }
    }, (err: HttpErrorResponse) => {
      console.log("error: " + err);

    });
  }
}
