import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LocatarioComponent } from './pages/locatario/locatario.component';
import { PropriedadeComponent } from './pages/propriedade/propriedade.component';
import { ProprietarioComponent } from './pages/proprietario/proprietario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { DetalhesComponent } from './pages/locatario/detalhes/detalhes.component';
import { DetalhesComponent as DetalhesProprietario } from './pages/proprietario/detalhes/detalhes.component';
import { DetalhesPropriedadeComponent } from './pages/propriedade/detalhes/detalhes.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'locatario',
        component: LocatarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'locatario/detalhes/:id',
        component: DetalhesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'locatario/detalhes',
        component: DetalhesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'proprietario/detalhes/:id',
        component: DetalhesProprietario,
        canActivate: [AuthGuard]
    },
    {
        path: 'proprietario/detalhes',
        component: DetalhesProprietario,
        canActivate: [AuthGuard]
    },
    {
        path: 'propriedade',
        component: PropriedadeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'propriedade/detalhes',
        component: DetalhesPropriedadeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'propriedade/detalhes/:id',
        component: DetalhesPropriedadeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'proprietario',
        component: ProprietarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'usuario/:id',
        component: UsuarioComponent,
        canActivate: [AuthGuard]
    }

];
