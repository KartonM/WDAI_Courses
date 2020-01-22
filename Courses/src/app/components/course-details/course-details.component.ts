import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentAndRatingService } from '../../services/enrollment-and-rating.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  private course: Course;
  private courseTypeLabel: string;

  private notEnrolled: Promise<boolean>;
  private enrolledAndNotRated: Promise<boolean>;
  private enrolledAndRated: Promise<boolean>;

  private rate;
  private userRate;
  private availableSeats;
  private takenSeats;

  constructor(private courseService: CourseService, private enrollmentAndRRatingService: EnrollmentAndRatingService, private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit() {
    const courseId : string = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(courseId).subscribe(c => {
      this.course = c;
      this.course.id = courseId;
      this.courseTypeLabel = Course.typeLabel(this.course.type);

      this.availableSeats = this.course.seats - this.takenSeats;
    });

    var email = this.authService.getUser().email;

    this.enrollmentAndRRatingService.getEnrollments().subscribe(es => {
      const isEnrolled = es.some(e => e.courseId === courseId && e.email === email);
      const hasRated = es.some(e => e.courseId === courseId && e.email === email && e.rate != undefined);
      if (hasRated) {
        this.userRate = es.find(e => e.courseId === courseId && e.email === email).rate;
      }

      this.notEnrolled = Promise.resolve(!isEnrolled);
      this.enrolledAndNotRated = Promise.resolve(isEnrolled && !hasRated);
      this.enrolledAndRated = Promise.resolve(isEnrolled && hasRated);

      this.rate = this.enrollmentAndRRatingService.averageCourseRating(es.filter(e => e.courseId === courseId)).toString();

      this.takenSeats = es.filter(e => e.courseId === courseId).length;
      this.availableSeats = this.course.seats - this.takenSeats;
      }
    );
  }

  enroll() {
    if (this.enrollmentAndRRatingService.enrollCurrentUserFor(this.course.id)) {
      console.log("ZMNIEJSZAM ILOŚĆ MIEJSC");
      this.availableSeats = this.availableSeats - 1;
    }
  }

  rateCourse(rate: number) {
    console.log('Oceniono kurs na: ' + rate);
    this.enrollmentAndRRatingService.rateCourse(this.course.id, rate);

    this.enrollmentAndRRatingService.getEnrollments().subscribe(es => {
        this.rate = this.enrollmentAndRRatingService.averageCourseRating(es.filter(e => e.courseId === this.course.id)).toString();
      }
    );
  }
}
