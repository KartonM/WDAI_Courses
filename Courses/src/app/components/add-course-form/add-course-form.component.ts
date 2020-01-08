import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

  @Input() course: Course;
  @Output() addCourse: EventEmitter<Course> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.keys = Object.keys(CourseType).filter(k => !isNaN(Number(k)));
  }

  ngOnInit() {
    if (this.course == null) {
      this.course = new Course();
      this.course.type = CourseType.Lecture;
    }

    this.courseForm = this.formBuilder.group({
      name: [this.course.name, Validators.required],
      imgPath: [this.course.imgPath, [Validators.required, Validators.pattern(/\.(jpeg|jpg|gif|png|bmp)/)]],
      semester: [this.course.semester, [Validators.required, Validators.min(1), Validators.max(8)]],
      ECTS: [this.course.ECTS, [Validators.required, Validators.min(1), Validators.max(30)]],
      seats: [this.course.seats, [Validators.required, Validators.min(1), Validators.max(300)]],
      type: this.course.type,
      description: [this.course.description, [Validators.required, Validators.minLength(30)]]
    });
  }
  getCourseTypeLabel(key) {
    return Course.typeLabel(Number(key));
  }

  onSubmit() {
    let courseToBeAdded: Course = this.courseForm.value;
    console.log(courseToBeAdded);
    this.addCourse.emit(courseToBeAdded);
    this.courseForm.reset({ type: '0' });
  }
}
