import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: string;
  token: string;
  constructor() { }

  ngOnInit() {
    this.user = localStorage.getItem('email').split('@')[0];
    this.token = localStorage.getItem('accessToken');
    
    console.log("current user: " + this.user + ", " + this.token);
  }

}
