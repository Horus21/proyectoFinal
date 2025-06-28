import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ICourse } from '../../shared/models';
import { CursosService } from '../../services/cursos/cursos.service';
import { CourseModalComponent, CourseModalData } from '../course-modal/course-modal.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild(MatTable) table!: MatTable<ICourse>;

  displayedColumns: string[] = ['name', 'description', 'price', 'level', 'duration', 'actions'];
  
  private readonly coursesService = inject(CursosService);
  courses: ICourse[] = [];
  
  // Opciones para el dropdown de nivel
  levelOptions = [
    { value: 'Principiante', label: 'Principiante' },
    { value: 'Intermedio', label: 'Intermedio' },
    { value: 'Avanzado', label: 'Avanzado' }
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.coursesService.getAllCourses().subscribe(
      {
        next: (res) => {
          this.courses = res;
        }
      }
    );
  }

  getLevelColor(level: string): string {
    switch (level.toLowerCase()) {
      case 'principiante':
        return 'beginner';
      case 'intermedio':
        return 'intermediate';
      case 'avanzado':
        return 'advanced';
      default:
        return 'beginner';
    }
  }

  editCourse(course: ICourse): void {
    this.openCourseModal('edit', course);
  }

  deleteCourse(course: ICourse): void {
    console.log('Eliminando curso:', course);
    // Aquí implementarías la lógica para eliminar
    const id = course.id
    this.coursesService.deleteCourse(id!).subscribe({
      next:()=>{
        this.courses = this.courses.filter(c => c.id !== course.id);
        this.table.renderRows();    
        }
    })
  
    
  }

  createNewCourse(): void {
    this.openCourseModal('create');
  }

  openCourseModal(mode: 'create' | 'edit', course?: ICourse): void {
    const modalData: CourseModalData = {
      mode: mode,
      course: course,
      levelOptions: this.levelOptions
    };

    const dialogRef = this.dialog.open(CourseModalComponent, {
      width: '500px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (mode === 'create') {
          // Crear nuevo curso
          const newCourse: ICourse = {
            id: this.courses.length + 1,
            name: result.name,
            description: result.description,
            price: result.price,
            level: result.level,
            duration: result.duration
          };
          
          this.courses.push(newCourse);
          console.log('Nuevo curso creado:', newCourse);
        } else if (mode === 'edit' && course) {
          // Actualizar curso existente
          const index = this.courses.findIndex(c => c.id === course.id);
          if (index !== -1) {
            this.courses[index] = {
              ...course,
              name: result.name,
              description: result.description,
              price: result.price,
              level: result.level,
              duration: result.duration
            };
            console.log('Curso actualizado:', this.courses[index]);
          }
        }
        
        this.table.renderRows();
      }
    });
  }
}
