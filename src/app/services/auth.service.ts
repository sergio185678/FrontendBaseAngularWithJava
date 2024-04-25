import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpclient=inject(HttpClient)
  private url=environment.apiUrl+"/auth";

  constructor() { }

  autentificar():any{
    return this.httpclient.get<any>(this.url+"/validar_token");
  }

  obtenerInformaciónJWT():Observable<any>{
    return this.httpclient.get<any>(this.url+"/info_user_jwt");
  }

  registrar(usuario:Usuario):any{
    return this.httpclient.post(this.url+"/register",usuario);
  }

  login(usuario:Usuario):any{
    return this.httpclient.post(this.url+"/login",usuario);
  }
  
}
