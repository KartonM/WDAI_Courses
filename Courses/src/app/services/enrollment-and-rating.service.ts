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

  averageCourseRating(enrollments: CourseEnrollment[]) {
    if (!enrollments) return 'Ten kurs nie ma jeszcze ocen';
    var rateSum = 0;
    var ratesCount = 0;
   // console.log("Sprawdzam ocenę");
   // console.log("mam " + enrollments.length + " zapisów do przejrzenia");
    for (var i = 0; i < enrollments.length; i++) {
      if (!enrollments[i].rate) continue;
      rateSum += enrollments[i].rate;
      ratesCount++;
    }
    //console.log(rateSum);
    //console.log(ratesCount);
    if (ratesCount == 0) return 'Ten kurs nie ma jeszcze ocen';
    return rateSum / ratesCount;
  }
}
