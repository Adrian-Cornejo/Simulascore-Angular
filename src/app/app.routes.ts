import { Routes } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';
import { LoginComponent } from './login/login.component';
import { DashboardDirectivoComponent } from './directivo/dashboard-directivo/dashboard-directivo.component';
import { DashboardAlumnoComponent } from './alumno/dashboard-alumno/dashboard-alumno.component';
import { DashboardProfesorComponent } from './profesor/dashboard-profesor/dashboard-profesor.component';
import { RoleGuard } from './guards/role.guard';

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
