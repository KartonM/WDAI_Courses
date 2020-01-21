import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  private course: Course;
  private courseTypeLabel: string;

  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    const courseId : string = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(courseId).subscribe(c => {
      this.course = c;
      this.course.id = courseId;
      this.courseTypeLabel = Course.typeLabel(this.course.type);
    });
  }

}
