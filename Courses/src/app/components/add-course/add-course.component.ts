import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
  }

  addCourse(course: Course) {
    this.courseService.addCourse(course);
    this.router.navigate(['/admin']);
  }
}
