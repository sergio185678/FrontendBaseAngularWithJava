import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private httpclient=inject(HttpClient);
  private url=environment.apiUrl+"/user";

  constructor() { }

  obtenerUsuarios():Observable<any>{
    return this.httpclient.get<any>(this.url+"/usuarios");
  }

  obtenerUsuario(id:number):Observable<any>{
    return this.httpclient.get<any>(this.url+"/usuario/"+id.toString());
  }

  obtenerUsarioPorJWT():Observable<any>{
    return this.httpclient.get<any>(this.url+"/user_by_jwt")
  }
  
  obtenerUsuariosPaginacion(page:Number=0,size:Number=5,searchTerm:String=""):Observable<any>{
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('searchTerm', searchTerm.toString());
    return this.httpclient.get<any>(this.url+"/usuariospaginacion", { params });
  }

  editarUsuario(id:number,usuario:Usuario):Observable<any>{
    return this.httpclient.put<any>(this.url+"/usuario/"+id.toString(),usuario);
  }

  eliminarUsuario(id:number){
    return this.httpclient.delete(this.url+"/usuario/"+id.toString());
  }

}
