import { Component } from '@angular/core';
import { CargoService } from '../../../services/cargo.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AuthService } from '../../../services/auth.service';
import { Cargo } from '../../../models/cargo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargo',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './cargos.component.html',
  styleUrl: './cargos.component.css'
})
export class CargosComponent {

  nombre_usuario:String="";
  cargos:Cargo[]=[];

  constructor(private authservice:AuthService,private cargoservice:CargoService,private router:Router){
    this.authservice.obtenerInformaciónJWT().subscribe((data)=>{
      this.nombre_usuario=data.object.sub;
    })
    this.cargoservice.obtenerCargos().subscribe((data)=>{
      this.cargos=data.object;
    })
  }

  cargoclick(id:any){
    this.router.navigateByUrl("/cargo/"+id);
  }
}
