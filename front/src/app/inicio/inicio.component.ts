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
  passwordErrors: string[] = [];
  

  constructor(private formBuilder: FormBuilder, private registroService: RegistroService) {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      apellidos:['',[Validators.required,Validators.maxLength(255)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      password_confirmation:['',[Validators.required,Validators.minLength(8)]],
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
          this.mensajeError = null;
          this.passwordErrors = [];
          this.mensajeExito = '¿Quién eres? ¿Cómo has conseguido dar con la clave? (Ve para arriba, ya puedes iniciar sesión)';
        }, error => {
          console.error('Error al llamar a la API:', error);
          if (error.error.errores && error.error.errores.password) {
            this.passwordErrors = error.error.errores.password;
          } else {
            this.mensajeError = error.message;
          }
        });
      } else{
          this.mensajeError = "No puedes, simplemente no puedes registrate";
          this.mensajeExito = null
      }
      
    }
  }

}