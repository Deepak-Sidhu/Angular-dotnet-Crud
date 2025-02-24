import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

export const routes: Routes = [
  {
    path: '',
    component: StudentListComponent,
  },
  {
    path: 'student-list',
    component: StudentListComponent,
  },
  {
    path: 'create-student',
    component: StudentFormComponent,
  },
  {
    path: 'student/:id',
    component: StudentFormComponent,
  }
];
