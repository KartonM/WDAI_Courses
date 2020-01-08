import { Injectable } from '@angular/core';
import *  as  data from './mockCourses.json';
import { Course } from '../models/Course';
import { CourseType } from '../models/Course';

@Injectable(({
  providedIn: 'root'
}) as any)
export class CourseService {
  constructor() { }

  getCourses() {
    return ((data as any).default as Course[]);
  }

  getCourse(id: number) {
    return this.getCourses().find(c => c.id === id);
  }

  addCourse(course: Course) {
    console.log("Course added.");
    console.log(JSON.stringify(course));
  }

  updateCourse(course: Course) {
    console.log("Course edited.");
    console.log(JSON.stringify(course));
  }

  deleteCourse(id: number) {
    console.log("usuwam kurs o id: " + id.toString());
  }
}
