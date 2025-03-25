import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { RegistroService } from '../service/registro.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule // Asegúrate de que HttpClientModule esté importado aquí
  ]
})
export class InicioComponent implements OnInit {

  formulario: FormGroup;
  RegistroService: any;
  mensajeError: string | null = null;
  mensajeExito: string | null = null;
  errorValidacion: { [key: string]: string[] } | null = {};

  constructor(private formBuilder: FormBuilder, private registroService: RegistroService) {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      apellidos:['',[Validators.required,Validators.maxLength(255)]],
      email:['',[Validators.required,Validators.email]],
      contraseña:['',[Validators.required,Validators.minLength(8)]],
      contraseña_confirmation:['',[Validators.required,Validators.minLength(8)]],
      apodo:['',[Validators.required,Validators.maxLength(255)]],
      frase:['',[Validators.required,Validators.maxLength(255)]]
      
    });
  }

  ngOnInit(): void {
    // Puedes agregar lógica adicional aquí si es necesario
  }

  onSubmit(): void {

    if (this.formulario.valid) {

      const respuesta = 'YO VOY A IR';
      const datos = this.formulario.value;
      const {frase, ...datosSinFrase} = datos;

      if(frase.toUpperCase() === respuesta){
        this.registroService.registro(datosSinFrase).subscribe(response => {
          console.log('Respuesta de la API:', response);
        }, error => {
          console.error('Error al llamar a la API:', error);
          this.mensajeError = error.message;
          this.errorValidacion = this.transformValidationErrors(error.error.errores || null);
        });
        this.mensajeError = null 
        this.errorValidacion = null
        this.mensajeExito = '¿Quién eres? ¿Cómo has conseguido dar con la clave?'
      } else{
          this.mensajeError = "No puedes, simplemente no puedes registrate";
          this.mensajeExito = null
      }
      
    }
  }

  private transformValidationErrors(errors: any): any {
    const transformedErrors: any = {};
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const newKey = key.replace('ñ', 'n');
        transformedErrors[newKey] = errors[key];
      }
    }
    return transformedErrors;
  }
}