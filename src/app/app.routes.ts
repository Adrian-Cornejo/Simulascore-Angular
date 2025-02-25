import { Routes } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';
import { LoginComponent } from './login/login.component';
import { DashboardDirectivoComponent } from './directivo/dashboard-directivo/dashboard-directivo.component';
import { DashboardAlumnoComponent } from './alumno/dashboard-alumno/dashboard-alumno.component';
import { DashboardProfesorComponent } from './profesor/dashboard-profesor/dashboard-profesor.component';
import { RoleGuard } from './guards/role.guard';
import { CreateAcountComponent } from './login/create-acount/create-acount.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './reset-password/new-password/new-password.component';

export const routes: Routes = [
    {
        path :'',
        component: ProfilesComponent,
        pathMatch: 'full'
    },
    {
        path : 'login',
        component: LoginComponent
    },
    {
        path : 'singup',
        component : CreateAcountComponent,
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
    },
    { 
        path: 'new-password',
        component: NewPasswordComponent },
    {
        path:'directivo',
        component:DashboardDirectivoComponent,
        title: 'Directivo',
        canActivate: [RoleGuard],
        data: { expectedRole: 'Directivo' },
    },
    {
        path: 'alumno',
        component: DashboardAlumnoComponent ,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Alumno' },
    },
    {
        path :'profesor',
        component: DashboardProfesorComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: 'profesor' },
    }
];
