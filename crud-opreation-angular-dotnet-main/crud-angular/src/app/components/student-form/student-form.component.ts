import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IStudent } from '../../interfaces/student';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css',
})
export class StudentFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster=inject(ToastrService);
  studentForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    class: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    marks: [0, [Validators.required]],
  });
  studentId!: number;
  isEdit = false;
  ngOnInit() {
    this.studentId = this.route.snapshot.params['id'];
    if (this.studentId) {
      this.isEdit = true;
      this.httpService.getStudent(this.studentId).subscribe((result) => {
        console.log(result);
        this.studentForm.patchValue(result);
      });
    }
  }
  save() {
    console.log(this.studentForm.value);
    const student: IStudent = {
      firstName: this.studentForm.value.firstName!,
      lastName: this.studentForm.value.lastName!,
      class: this.studentForm.value.class!,
      subject: this.studentForm.value.subject!,
      marks: this.studentForm.value.marks!,
    };
    if (this.isEdit) {
      this.httpService
        .updateStudent(this.studentId, student)
        .subscribe(() => {
          console.log('success');
          this.toaster.success("Record updated sucessfully.");
          this.router.navigateByUrl('/student-list');
        });
    } else {
      this.httpService.createStudent(student).subscribe(() => {
        console.log('success');
        this.toaster.success("Record added sucessfully.");
        this.router.navigateByUrl('/student-list');
      });
    }
  }
}
