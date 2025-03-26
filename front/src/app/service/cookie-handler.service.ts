import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieHandlerService {

  constructor(private cookieService: CookieService) {}


      getToken(): string{
        return this.cookieService.get('token');
      }

      getUsuario(): any{
        const usuario = this.cookieService.get('usuario');
        return usuario? JSON.parse(usuario) : null;
      }

      clearCookies(): void{
        this.cookieService.delete('token','/');
        this.cookieService.delete('usuario','/');
      }
  
}
