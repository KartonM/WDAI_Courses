import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CourseType, Course } from '../../models/Course';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.css']
})

export class AddCourseFormComponent implements OnInit {
  courseForm: FormGroup; 
  courseTypes = CourseType;
  keys;

  @Output() addCourse: EventEmitter<Course> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.keys = Object.keys(CourseType).filter(k => !isNaN(Number(k)));
  }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      imgPath: ['', [Validators.required, Validators.pattern(/\.(jpeg|jpg|gif|png|bmp)/)]],
      semester: ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      ECTS: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
      seats: ['', [Validators.required, Validators.min(1), Validators.max(300)]],
      type: '0',
      description: ['', [Validators.required, Validators.minLength(30)]]
    });
  }
  getCourseTypeLabel(key) {
    return Course.typeLabel(Number(key));
  }

  onSubmit() {
    let courseToBeAdded: Course = this.courseForm.value;
    console.log(courseToBeAdded);
    this.addCourse.emit(courseToBeAdded);
    this.courseForm.reset();
  }
}
