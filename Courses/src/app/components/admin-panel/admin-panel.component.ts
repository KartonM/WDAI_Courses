import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  courses: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses =>
      this.courses = courses
    );
  }

  deleteCourse(id: number, event) {
    event.preventDefault();
    this.courses = this.courses.filter(c => c.id !== id);
    this.courseService.deleteCourse(id);
  }
}
