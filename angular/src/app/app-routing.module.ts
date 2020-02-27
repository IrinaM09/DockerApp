import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', component: AuthComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
