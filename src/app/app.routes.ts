import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'home',component:HomeComponent}
];

