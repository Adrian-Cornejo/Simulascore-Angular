import { Routes } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';
import { LoginDirectivoComponent } from './directivo/login-directivo/login-directivo.component';
import { LoginAlumnoComponent } from './alumno/login-alumno/login-alumno.component';
import { LoginMaestroComponent } from './maestro/login-maestro/login-maestro.component';

export const routes: Routes = [
    {
        path :'',
        component: ProfilesComponent,
    },
    {
        path:'directivo',
        component:LoginDirectivoComponent,
        title: 'Login-Directivo'
    },
    {
        path: 'alumno',
        component: LoginAlumnoComponent,
    },
    {
        path :'maestro',
        component: LoginMaestroComponent,
    }
];
