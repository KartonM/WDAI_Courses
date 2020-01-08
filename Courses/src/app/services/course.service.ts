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
  }

  updateCourse(course: Course) {
    console.log("Course edited.");
  }
}
