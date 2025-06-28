import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'cursos',component:CoursesComponent},
    {path:'dashboard',component:DashboardComponent}
];
