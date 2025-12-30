import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { UploadResourceComponent } from './components/upload-resource/upload-resource.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { ProfessorDashboardComponent } from './components/professor-dashboard/professor-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentGuard } from './guards/student.guard';
import { ProfessorGuard } from './guards/professor.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resources', component: ResourceListComponent },
  { path: 'resources/:id', component: ResourceDetailComponent },
  { path: 'upload', component: UploadResourceComponent },
  { path: 'take-quiz', component: TakeQuizComponent },
  { path: 'take-quiz/:id', component: TakeQuizComponent },
  { 
    path: 'create-quiz', 
    component: CreateQuizComponent,
    canActivate: [AuthGuard, ProfessorGuard]
  },
  { 
    path: 'student/dashboard', 
    component: StudentDashboardComponent,
    canActivate: [AuthGuard, StudentGuard]
  },
  { 
    path: 'professor/dashboard', 
    component: ProfessorDashboardComponent,
    canActivate: [AuthGuard, ProfessorGuard]
  },
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
