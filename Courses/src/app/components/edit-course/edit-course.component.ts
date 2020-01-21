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
  courseLoaded: Promise<boolean>;
  constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const courseId: string = this.route.snapshot.paramMap.get('id');

    this.courseService.getCourse(courseId).subscribe(c => {
      this.courseToBeEdited = c;
      this.courseToBeEdited.id = courseId;
      console.log(this.courseToBeEdited.toString());
      this.courseLoaded = Promise.resolve(true);
    });
  }

  editCourse(course: Course) {
    course.id = this.route.snapshot.paramMap.get('id');
    this.courseService.updateCourse(course);
    this.router.navigate(['/admin']);
  }
}
