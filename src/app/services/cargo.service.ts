import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private httpclient=inject(HttpClient);
  private url=environment.apiUrl+"/role";

  constructor() { }

  obtenerCargo(id:number):Observable<any>{
    return this.httpclient.get<any>(this.url+"/cargo/"+id.toString());
  }

  obtenerCargos():Observable<any>{
    return this.httpclient.get<any>(this.url+"/cargos");
  }

  obtenerUsuariosPorCargo(id:number):Observable<any>{
    return this.httpclient.get<any>(this.url+"/usuarios_by_cargo/"+id.toString())
  }
  
}
