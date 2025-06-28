import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICourse } from '../../shared/models';
import { Observable, of, switchMap, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

 private http:HttpClient = inject(HttpClient);
 private baseUri= "http://localhost:8084/course";


 getAllCourses():Observable<ICourse[]>{
  return this.http.get<ICourse[]>(this.baseUri).pipe(
    timeout(3000),
    switchMap((response) =>{ return of(response)} )

  )
 }

 createCourse(course:ICourse):Observable<ICourse>{
  return this.http.post<ICourse>(this.baseUri,course).pipe(
    timeout(3000),
    switchMap((response) =>{ return of(response)} )

  )
 }
 updateCourse(course:ICourse):Observable<ICourse>{
  return this.http.put<ICourse>(this.baseUri,course).pipe(
    timeout(3000),
    switchMap((response) =>{ return of(response)} )

  )
 }

 deleteCourse(id:number):Observable<ICourse>{
  return this.http.delete<ICourse>(`${this.baseUri}/${id}`).pipe(
    timeout(3000),
    switchMap((response) =>{ return of(response)} )

  )
 }
}
