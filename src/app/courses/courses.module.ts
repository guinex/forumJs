import { NgModule } from '@angular/core';
import { CourseComponent } from './course.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations:[
    CourseComponent
  ],
  imports:[
    AngularMaterialModule,
    CommonModule,
    RouterModule
  ]
})
export class CoursesModule {}
