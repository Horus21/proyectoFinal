import { Component, EventEmitter, inject, Inject, OnInit, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ICourse } from '../../shared/models';
import { CursosService } from '../../services/cursos/cursos.service';

export interface CourseModalData {
  mode: 'create' | 'edit';
  course?: ICourse;
  levelOptions: Array<{ value: string; label: string }>;
}

@Component({
  selector: 'app-course-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './course-modal.component.html',
  styles: [`
    .course-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }
    
    .full-width {
      width: 100%;
    }
    
    mat-dialog-actions {
      padding: 16px 0;
    }
    
    mat-dialog-actions button {
      margin-left: 8px;
    }
  `]
})
export class CourseModalComponent implements OnInit {
  courseForm: FormGroup;
  levelOptions: Array<{ value: string; label: string }> = [];
  isEditMode: boolean = false;
  private readonly coursesService = inject(CursosService);
  @Output() updateTable = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseModalData
  ) {
    this.levelOptions = data.levelOptions || [];
    this.isEditMode = data.mode === 'edit';
    
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      level: ['', Validators.required],
      duration: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
editService(dataCourse: ICourse){
  this.coursesService.updateCourse(dataCourse).subscribe({
    next:()=>{
      this.updateTable.emit(true);
    }
  })
}
createCourseService(dataCourse: ICourse){
  this.coursesService.createCourse(dataCourse).subscribe({
    next:()=>{
      this.updateTable.emit(true);
    }
  })
}
  ngOnInit(): void {
    // Si es modo edición, cargar los datos del curso
    if (this.isEditMode && this.data.course) {
      this.courseForm.patchValue({
        name: this.data.course.name,
        description: this.data.course.description,
        price: this.data.course.price,
        level: this.data.course.level,
        duration: this.data.course.duration
      });
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
      
      // Si es modo edición, incluir el ID del curso original
      if (this.isEditMode && this.data.course) {
        formData.id = this.data.course.id;
        this.editService(formData)
      }else{
        this.createCourseService(formData)
      }
       
      this.dialogRef.close(formData);
    }
  }
} 