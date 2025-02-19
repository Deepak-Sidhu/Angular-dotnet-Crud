import { Component, inject } from '@angular/core';
import { IStudent } from '../../interfaces/student';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  router = inject(Router);
  studentList: IStudent[] = [];
  httpService = inject(HttpService);
  toaster = inject(ToastrService);
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'class',
    'subject',
    'marks',
    'action',
  ];
  ngOnInit() {
    this.getstudentFromServer();
  }
  getstudentFromServer() {
    this.httpService.getAllStudent().subscribe((result) => {
      this.studentList = result;
      console.log(this.studentList);
    });
  }
  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl('/student/' + id);
  }
  delete(id: number) {
    this.httpService.deleteStudent(id).subscribe(() => {
      console.log('deleted');
      this.getstudentFromServer();
      this.toaster.success('Record deleted sucessfully');
    });
  }
}
