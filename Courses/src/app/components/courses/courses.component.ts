import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses:Course[];

  constructor(private courseService:CourseService) { }

  ngOnInit() {
    this.courses = this.courseService.getCourses();
    console.log(this.courses);
  }

  addCourse(course: Course) {
    course.id = Math.max.apply(Math, this.courses.map(c => c.id)) + 1;
    this.courses.push(course);
  }
}
