import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { CargoService } from '../../../services/cargo.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-cargo',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './cargo.component.html',
  styleUrl: './cargo.component.css'
})
export class CargoComponent {

  idCargo:number;
  nombreCargo:string="";
  arrayUsuario:Usuario[]=[];

  constructor(private activatedRoute:ActivatedRoute,private cargoservice:CargoService){
    this.idCargo=+this.activatedRoute.snapshot.paramMap.get('id')!;
    this.cargoservice.obtenerCargo(this.idCargo).subscribe((data)=>{
      this.nombreCargo=data.object.nombre;
    })
    this.cargoservice.obtenerUsuariosPorCargo(this.idCargo).subscribe((data)=>{
      this.arrayUsuario=data.object;
    })
  }
}
