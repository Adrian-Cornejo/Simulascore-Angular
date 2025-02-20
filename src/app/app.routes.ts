import { Routes } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';
import { LoginComponent } from './login/login.component';
import { DashboardDirectivoComponent } from './directivo/dashboard-directivo/dashboard-directivo.component';
import { DashboardAlumnoComponent } from './alumno/dashboard-alumno/dashboard-alumno.component';
import { DashboardMaestroComponent } from './maestro/dashboard-maestro/dashboard-maestro.component';

export const routes: Routes = [
    {
        path :'',
        component: ProfilesComponent,
    },
    {
        path : 'login',
        component: LoginComponent
    },
    {
        path:'directivo',
        component:DashboardDirectivoComponent,
        title: 'Directivo'
    },
    {
        path: 'alumno',
        component: DashboardAlumnoComponent ,
    },
    {
        path :'maestro',
        component: DashboardMaestroComponent,
    }
];
