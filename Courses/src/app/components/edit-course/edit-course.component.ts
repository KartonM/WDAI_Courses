import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courseToBeEdited: Course;
  constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.courseToBeEdited = this.courseService.getCourse(+params['id']);
    });
  }

  editCourse(course: Course) {
    this.courseService.updateCourse(course);
    this.router.navigate(['/admin']);
  }
}
