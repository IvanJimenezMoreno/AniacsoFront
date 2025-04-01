
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CookieHandlerService } from '../service/cookie-handler.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComentarioService } from '../service/comentario.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  comentarios: any[] = [];
  comentarioForm:FormGroup;
  token: string = ""
  usuarios:any[]=[];

  constructor(public cookieHandlerService: CookieHandlerService,
    private comentarioService:ComentarioService,
    private formBuilder:FormBuilder,
    private usuarioService:UsuarioService){
    
      this.comentarioForm = this.formBuilder.group({
        contenido:['',[Validators.required]]
      });
  }



  ngOnInit(): void {
    this.token = this.cookieHandlerService.getToken();
    this.obtenerComentarios();
    this.obtenerUsuarios()
  }

  obtenerComentarios() {
    this.comentarioService.getComentarios(this.token).subscribe(response =>{
      this.comentarios = response;
    });
  }

  obtenerUsuarios(){
    this.usuarioService.getUsuarios(this.token).subscribe((data)=>{
      this.usuarios = data;
    })
  }

  crearComentario(): void {
    if (this.comentarioForm.valid) {
      const contenido = this.comentarioForm.get('contenido')?.value;
      this.comentarioService.createComentario(contenido, this.token).subscribe(response => {
        this.obtenerComentarios(); 
        this.comentarioForm.reset(); 
      });
    }
  }
}
