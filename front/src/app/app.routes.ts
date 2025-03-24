import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
  {path: '', component: InicioComponent}, 
  {path: 'iniciosesion', component: InicioSesionComponent},
  {path: 'registro', component: RegistroComponent}
];
