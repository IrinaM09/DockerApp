import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceService } from 'src/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(private service: ServiceService,
    private router: Router) {
  }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }
  
  signup() {
    this.service.signup(this.email, this.password).subscribe((res) => {
      console.log("Success")
      this.router.navigate(['/auth']);
    }, (err: HttpErrorResponse) => {
      console.log("error: " + err);

    });
  }
}
