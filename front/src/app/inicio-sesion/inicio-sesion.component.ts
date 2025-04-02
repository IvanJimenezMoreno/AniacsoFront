import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InicioSesionService } from '../service/inicio-sesion.service';
import { CookieService } from 'ngx-cookie-service';
import { CookieHandlerService } from '../service/cookie-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    HttpClientModule ],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css',
  providers: [CookieService]
})
export class InicioSesionComponent {

  formulario:FormGroup;
  mensajeError:any;


  constructor(private formBuilder: FormBuilder, 
    private inicioSesionService: InicioSesionService, 
    private cookieService: CookieService, 
    private cookieHandlerService: CookieHandlerService,
    private router:Router){
    this.formulario = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
  }
      
  onSubmit(){
    if(this.formulario.valid){
      let datos = this.formulario.value
      this.inicioSesionService.inicio(datos).subscribe(response =>{
          this.cookieService.set('token', response.token, 7, '/');
          this.cookieService.set('usuario',JSON.stringify(response.usuario),7,'/');

         let usuario = this.cookieHandlerService.getUsuario();

         
         this.router.navigate(['/home'])
      },
      error=>{
        
        this.mensajeError = error.error.mensaje;
        
      }      
      )
    }
  }


}
