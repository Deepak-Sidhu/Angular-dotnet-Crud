import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IStudent } from './interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'http://localhost:5280';
  http = inject(HttpClient);
  constructor() {}

  getAllStudent() {
    return this.http.get<IStudent[]>(this.apiUrl + '/api/Student');
  }
  createStudent(student: IStudent) {
    return this.http.post(this.apiUrl + '/api/Student', student);
  }
  getStudent(studentId: number) {
    return this.http.get<IStudent>(
      this.apiUrl + '/api/Student/' + studentId
    );
  }
  updateStudent(studentId: number, student: IStudent) {
    return this.http.put<IStudent>(
      this.apiUrl + '/api/Student/' + studentId,
      student
    );
  }
  deleteStudent(studentId: number) {
    return this.http.delete(this.apiUrl + '/api/Student/' + studentId);
  }
}
