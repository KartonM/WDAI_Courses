import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CourseFilters } from '../../models/CourseFilters';

@Component({
  selector: 'app-course-filters',
  templateUrl: './course-filters.component.html',
  styleUrls: ['./course-filters.component.css']
})
export class CourseFiltersComponent implements OnInit {
  @Output() courseFilters: EventEmitter<CourseFilters> = new EventEmitter();
  semesterNumbers: number[];
  filtersForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.semesterNumbers = Array(8).fill(0).map((x, i) => i);
  }

  ngOnInit() {
    this.filtersForm = this.formBuilder.group({
      search: '',
      minECTS: '',
      maxECTS: '',
      minRate: '',
      maxRate: '',
      semester: new FormArray([])
    });

    this.addCheckboxes();
    this.filtersForm.reset();
    //this.applyFilters();
  }

  private addCheckboxes() {
    this.semesterNumbers.forEach((o, i) => {
      (this.filtersForm.controls.semester as FormArray).push(new FormControl(false));
    });
  }

  clearFilters(event) {
    event.preventDefault();
    this.filtersForm.reset();
    this.applyFilters();
  }

  applyFilters() {
    let filters = this.filtersForm.value as CourseFilters;
    filters.semester = filters.semester.map((b, i) => b ? i + 1 : -1).filter(s => s > 0);
    this.courseFilters.emit(filters);
  }
}
