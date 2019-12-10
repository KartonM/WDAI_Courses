import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/Course';

@Pipe({ name: 'searchPipe' })
export class SearchPipe implements PipeTransform {
  transform(courses: Course[], searchText: string): Course[] {
    if (!courses)
      return [];
    if (!searchText)
      return courses;
    searchText = searchText.toLowerCase();
    return courses.filter(course => {
      return course.name.toLowerCase().includes(searchText);
    });
  }
}

@Pipe({ name: 'semesterPipe' })
export class SemesterPipe implements PipeTransform{
  transform(courses: Course[], semesters: number[]): Course[] {
    if (!courses)
      return [];
    if (!semesters || semesters.length === 0)
      return courses;
    return courses.filter(c => semesters.includes(c.semester));
  }
}

@Pipe({ name: 'ectsPipe' })
export class ECTSPipe implements PipeTransform {
  transform(courses: Course[], min: number, max: number): Course[] {
    if (!courses)
      return [];
    if (!min && !max)
      return courses;
    const lower = min == null ? -Infinity : min;
    const upper = max == null ? Infinity : max;
    return courses.filter(c => c.ECTS >= lower && c.ECTS <= upper);
  }
}

@Pipe({ name: 'ratePipe' })
export class RatePipe implements PipeTransform {
  transform(courses: Course[], min: number, max: number): Course[] {
    if (!courses)
      return [];
    if (!min && !max)
      return courses;
    const lower = min == null ? -Infinity : min;
    const upper = max == null ? Infinity : max;
    return courses.filter(c => c.rating >= lower && c.rating <= upper);
  }
}
