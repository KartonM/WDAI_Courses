import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @Input() courses: Course[];
  constructor() { }

  ngOnInit() {
  }

  deleteCourse(course: Course) {
    this.courses = this.courses.filter(c => c.id !== course.id);
  }
}
