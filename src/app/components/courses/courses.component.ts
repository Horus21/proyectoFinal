import { Component, OnInit, inject } from '@angular/core';
import { CursosService } from '../../services/cursos/cursos.service';
import { ICourse } from '../../shared/models';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-courses',
  imports: [MatCardModule, MatButtonModule, MatGridListModule],
  providers:[CursosService],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  private readonly coursesService = inject(CursosService);
  courses!:ICourse[]
  
  ngOnInit(): void {
   this.getAllCourses()
  }

 getAllCourses(){
  this.coursesService.getAllCourses().subscribe(
    {
      next:(res)=>{
        this.courses = res
      }
    }
  )
 }
}
