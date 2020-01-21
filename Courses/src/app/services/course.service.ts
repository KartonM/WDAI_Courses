import { Injectable } from '@angular/core';
import *  as  data from './mockCourses.json';
import { Course } from '../models/Course';
import { CourseType } from '../models/Course';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable(({
  providedIn: 'root'
}) as any)
export class CourseService {
  constructor(private db: AngularFirestore) { }

  getCourses() {
    const ref = this.db.collection<Course>('/courses');
    return ref.valueChanges({ idField: 'id' });
  }

  getCourse(id: string) : Observable<Course> {
    console.log("Szukam ziomka o id: " + id);
    const ref = this.db.collection('/courses').doc<Course>(id);
    return ref.valueChanges();
  }

  initializeDb() {
    var predefinedCourses: Course[] = ((data as any).default as Course[]);
    predefinedCourses.forEach(c =>
      this.db.collection('/courses').add({
        'ECTS': c.ECTS,
        'description': c.description,
        'imgPath': c.imgPath,
        'name': c.name,
        'seats': c.seats,
        'semester': c.semester,
        'type': c.type
      }));
  }

  addCourse(course: Course) {
    this.db.collection('/courses').add({
      'ECTS': course.ECTS,
      'description': course.description,
      'imgPath': course.imgPath,
      'name': course.name,
      'seats': course.seats,
      'semester': course.semester,
      'type': course.type
    });
    //console.log("Course added.");
    //console.log(JSON.stringify(course));
  }

  updateCourse(course: Course) {
    console.log("Course edited.");
    console.log(JSON.stringify(course));
    this.db.collection('/courses').doc(course.id).set({
      'ECTS': course.ECTS,
      'description': course.description,
      'imgPath': course.imgPath,
      'name': course.name,
      'seats': course.seats,
      'semester': course.semester,
      'type': course.type
    });
  }

  deleteCourse(id: string) {
    console.log("usuwam kurs o id: " + id);
    return this.db.collection('/courses').doc(id).delete();
  }
}
