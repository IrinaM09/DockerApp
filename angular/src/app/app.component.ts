import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from 'src/service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service: ServiceService) {
  }

  ngOnInit() {
  }

  login() {
    this.service.login().subscribe((res) => {
      console.log("Success")

    }, (err: HttpErrorResponse) => {
      console.log("error: " + err);

    });
  }
}
