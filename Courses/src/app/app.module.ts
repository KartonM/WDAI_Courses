import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListItemComponent } from './components/courses-list-item/courses-list-item.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { AddCourseFormComponent } from './components/add-course-form/add-course-form.component';
import { CourseFiltersComponent } from './components/course-filters/course-filters.component';
import { SearchPipe, SemesterPipe, ECTSPipe, RatePipe } from './components/courses-list/CourseFilterPipes';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';

const appRoutes: Routes = [
  { path: 'course/:id', component: CourseDetailsComponent, canActivate: [AuthGuard]},
  { path: 'courses', component: CoursesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] },
  { path: 'addCourse', component: AddCourseComponent, canActivate: [AdminGuard] },
  { path: 'editCourse/:id', component: EditCourseComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

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
    RatePipe,
    CourseDetailsComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelComponent,
    AddCourseComponent,
    EditCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
