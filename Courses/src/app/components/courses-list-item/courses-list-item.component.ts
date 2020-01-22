import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Course } from '../../models/Course';
import { Router } from '@angular/router';
import { EnrollmentAndRatingService } from '../../services/enrollment-and-rating.service';
//import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit {
  shortDescriptionLength = 220;
  private rate;
  //@ViewChild(StarRatingComponent, {static: false}) starRating:StarRatingComponent;

  @Input() course: Course;
  @Output() deleteCourse: EventEmitter<Course> = new EventEmitter();

  constructor(private router: Router, private enrollmentAndRRatingService: EnrollmentAndRatingService) { }

  ngOnInit() {
    //console.log(this.course);
    this.enrollmentAndRRatingService.getEnrollments().subscribe(es => {
        this.rate = this.enrollmentAndRRatingService.averageCourseRating(es.filter(e => e.courseId === this.course.id)).toString();
      }
    );
  }

  getShortDescription():string {
    return this.course.description.length < this.shortDescriptionLength
      ? this.course.description
      : `${this.course.description.substring(0, this.shortDescriptionLength)}... `;
  }

  delete(event) {
    event.preventDefault();
    this.deleteCourse.emit(this.course);
  }

  routeToDetails() {
    this.router.navigate(['/course', this.course.id]);
  }
}
