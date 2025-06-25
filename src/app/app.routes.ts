import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'c',component:HomeComponent},
    {path:'',component:CoursesComponent},
    {path:'dashboard',component:DashboardComponent}
];
