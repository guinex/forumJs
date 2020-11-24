import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy{
  form: FormControl;
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {


    throw new Error('Method not implemented.');
  }
}
