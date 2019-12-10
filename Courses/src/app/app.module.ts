import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list-item/courses-list-item.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { AddCourseFormComponent } from './components/add-course-form/add-course-form.component';
import { CourseFiltersComponent } from './components/course-filters/course-filters.component';
import { SearchPipe, SemesterPipe, ECTSPipe, RatePipe } from './components/courses-list/CourseFilterPipes';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CoursesListComponent,
    CoursesListItemComponent,
    StarRatingComponent,
    AddCourseFormComponent,
    CourseFiltersComponent,
    SearchPipe,
    SemesterPipe,
    ECTSPipe,
    RatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
