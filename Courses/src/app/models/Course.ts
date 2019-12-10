export class Course {
  id: number;
  name: string;
  ECTS: number;
  semester: number;
  type: CourseType;
  seats: number;
  rating: number;
  imgPath: string;
  description: string;

  static typeLabel(type: CourseType): string {
    switch (type) {
    case CourseType.Lecture:
        return 'Wykład';
    case CourseType.Auditory:
        return 'Ćwiczenia audytoryjne';
    case CourseType.Laboratory:
        return 'Laboratoria';
    case CourseType.Project:
      return 'Projekt';

      default:
        return '';
    }
  }
}

export enum CourseType {
  Lecture, Auditory, Laboratory, Project
}
