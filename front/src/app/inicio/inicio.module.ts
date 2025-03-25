import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './inicio.component';

@NgModule({
    declarations: [
        // Remove InicioComponent from declarations array
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule, // Asegúrate de que HttpClientModule esté importado aquí
        InicioComponent // Add InicioComponent to imports array
    ],
    exports: [
        InicioComponent
    ]
})
export class InicioModule { }