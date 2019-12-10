import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/Course';
import { CourseFilters } from '../../models/CourseFilters';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @Input() courses: Course[];
  @Input() courseFilters: CourseFilters = new CourseFilters();

  constructor() { }

  ngOnInit() {
  }

  deleteCourse(course: Course) {
    this.courses = this.courses.filter(c => c.id !== course.id);
  }
}
