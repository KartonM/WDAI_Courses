import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { CourseEnrollment } from '../models/CourseEnrollment';

@Injectable(({
  providedIn: 'root'
}) as any)
export class EnrollmentAndRatingService {
  private courseEnrollments: CourseEnrollment[];
  constructor(private db: AngularFirestore, private authService: AuthenticationService) {
    this.db.collection<CourseEnrollment>('/enrollmentsAndRates').valueChanges()
      .subscribe(e => {
        this.courseEnrollments = e;
        //console.log("Mamy tyle dokumentów: " + this.courseEnrollments.length);
      });
  }

  getEnrollments() {
    const ref = this.db.collection<CourseEnrollment>('/enrollmentsAndRates');
    return ref.valueChanges({ idField: 'id' });
  }

  enrollCurrentUserFor(courseId: string) {
    if (this.authService.authState$ == null) {
      console.log('You have to be signed in to enroll in the course.');
      return false;
    }
    console.log("Zapisuję ziomka na: " + courseId);
    this.db.collection('/enrollmentsAndRates').add({
      'email': this.authService.getUser().email,
      'courseId': courseId
    });
    return true;
  }

  rateCourse(courseId: string, rate: number) {
    if (this.authService.authState$ == null) {
      console.log('You have to be signed in to rate courses.');
      return false;
    }

    this.db.collection<CourseEnrollment>('/enrollmentsAndRates').valueChanges({ idField: 'id' })
      .subscribe(es => {
        var enrollment =
          es.find(e => e.courseId === courseId && e.email === this.authService.getUser().email);

        this.db.collection('/enrollmentsAndRates').doc(enrollment.id).set({
          'email': enrollment.email,
          'courseId': enrollment.courseId,
          'rate': rate
        });
      });
  }

  averageCourseRating(enrollments: CourseEnrollment[]) {
    if (!enrollments) return 'Ten kurs nie ma jeszcze ocen';

    var rateSum = 0;
    var ratesCount = 0;

    for (var i = 0; i < enrollments.length; i++) {
      if (!enrollments[i].rate) continue;
      rateSum += enrollments[i].rate;
      ratesCount++;
    }

    if (ratesCount == 0) return 'Ten kurs nie ma jeszcze ocen';

    var avg = rateSum / ratesCount;
    return Math.round(avg * 100) / 100;
  }
}
