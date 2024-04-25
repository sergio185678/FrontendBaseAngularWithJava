import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  usuario!:Usuario;

  router=inject(Router)

  constructor(userService:UsuarioService){
    userService.obtenerUsarioPorJWT().subscribe((data)=>{
      this.usuario=data.object;
    })
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/login");
  }
  
}
