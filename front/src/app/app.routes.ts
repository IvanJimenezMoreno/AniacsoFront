import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'iniciosesion', component: InicioSesionComponent},
  {path: 'home', component: HomeComponent},
  // {path: '**', component:InicioComponent}

];
