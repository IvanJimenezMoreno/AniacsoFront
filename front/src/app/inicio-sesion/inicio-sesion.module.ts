
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InicioSesionComponent} from './inicio-sesion.component';

@NgModule({
    declarations: [
        
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule, 
        InicioSesionComponent 
    ],
    exports: [
        InicioSesionComponent
    ]
})
export class InicioModule { }