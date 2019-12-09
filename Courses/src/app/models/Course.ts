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
}

export enum CourseType {
  Lecture, Auditory, Laboratory, Project
}
