import { Injectable } from '@angular/core';
import *  as  data from './mockCourses.json';
import { Course } from '../models/Course';
import { CourseType } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor() { }

  getCourses() {
    return ((data as any).default as Course[]);
  }

  getCourse(id: number) {
    return ((data as any).default as Course[]).find(c => c.id === id);
  }


}
