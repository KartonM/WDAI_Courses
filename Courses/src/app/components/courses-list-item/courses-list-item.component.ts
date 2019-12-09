import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Course } from '../../models/Course';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.css']
})
export class CoursesListItemComponent implements OnInit {
  shortDescriptionLength = 220;
  @ViewChild(StarRatingComponent, {static: false}) starRating:StarRatingComponent;

  @Input() course: Course;
  @Output() deleteCourse: EventEmitter<Course> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    //console.log(this.course);
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
}
