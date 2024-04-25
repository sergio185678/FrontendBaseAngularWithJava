import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { CommonModule } from '@angular/common';
import { ViewModalComponent } from '../view-modal/view-modal.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { centrar,drawUnderline,hora_actual } from "../../../shared/utils/pdf-utils";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,FormsModule,EditModalComponent,CommonModule,ViewModalComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class HomeComponent{

  nombre_usuario:String="";
  cargo_usuario:String="";
  searchTerm: string = "";

  pagina_actual:number=1;//predeterminado
  sizeactual:number=5;//predeterminado
  visiblePages: number = 3;//predeterminado

  //se establecen luego
  elementostotales:number=0;
  sizzeinferior:number=0;
  arrayUsuario:Usuario[]=[];
  ultima_pagina:boolean=false;
  paginas_totale:number=0;

  modalVisualizar=false;
  modalEditar = false;
  modalEliminar=false;

  idUsuario:number=0;
  status:String="";

  //creo un subject para que funcione como cronometro para el buscado
  private searchTerms = new Subject<string>();

  constructor(private authservice:AuthService, private usuarioservice:UsuarioService){

    this.authservice.obtenerInformaciónJWT().subscribe((data)=>{
      this.nombre_usuario=data.object.sub;
      this.cargo_usuario=data.object.cargo;
    })
    this.usuarioservice.obtenerUsuariosPaginacion(this.pagina_actual-1,this.sizeactual).subscribe((data)=>{
      this.actualizarTablaUsuario(data);
    })
    //cuando el usuario deje de escribir por 2 segundos recien busca
    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(), 
      switchMap(async (term) => this.search(term))
    ).subscribe();

  }

  actualizarTablaUsuario(data:any){
    this.paginas_totale=data.object.totalPages;
    this.elementostotales=data.object.totalElements;
    this.sizzeinferior=(data.object.size*(this.pagina_actual-1))+data.object.numberOfElements;
    this.arrayUsuario=data.object.content;
    this.ultima_pagina=data.object.last;
  }

  //INPUT BUSCAR
  search(term: string) {
    this.pagina_actual=1;
    return this.usuarioservice.obtenerUsuariosPaginacion(this.pagina_actual-1,this.sizeactual,term).subscribe((data)=>{
      this.actualizarTablaUsuario(data);
    })
  }
  onSearchInput() {
    this.searchTerms.next(this.searchTerm);
  }
  
  //ACCIONES USUARIO
  visualizar(id:any){
    this.idUsuario=id;
    this.modalVisualizar=true;
  }
  editar(id:any){
    this.idUsuario=id;
    this.modalEditar=true;
  }
  eliminar(){
    this.usuarioservice.eliminarUsuario(this.idUsuario).subscribe(()=>{
      this.status="success";
      setTimeout(()=>{
        location.reload();
      }, 1000);
    })
  }

  //acciones modales
  abrirmodaleliminar(id:any){
    this.idUsuario=id;
    this.modalEliminar=true;
  }
  cerrarModal() {
    this.modalEditar = false;
    this.modalVisualizar = false;
    this.modalEliminar=false;
  }

  //NAVEGACIÓN
  anterior(){
    if(this.pagina_actual!=1){
      this.pagina_actual-=1;
      this.usuarioservice.obtenerUsuariosPaginacion(this.pagina_actual-1,this.sizeactual).subscribe((data)=>{
        this.actualizarTablaUsuario(data);
      })
    }
  }
  siguiente(){
    if(!this.ultima_pagina){
      this.pagina_actual+=1;
      this.usuarioservice.obtenerUsuariosPaginacion(this.pagina_actual-1,this.sizeactual).subscribe((data)=>{
        this.actualizarTablaUsuario(data);
      })
    }
  }
  cambiarsize() {
    this.pagina_actual=1;
    this.usuarioservice.obtenerUsuariosPaginacion(this.pagina_actual-1,this.sizeactual).subscribe((data)=>{
      this.actualizarTablaUsuario(data);
    })
  }

  //PAGINACIÓN
  irAPagina(page: number) {
    this.pagina_actual = page;
    this.usuarioservice.obtenerUsuariosPaginacion(this.pagina_actual-1,this.sizeactual).subscribe((data)=>{
      this.actualizarTablaUsuario(data);
    })
  }
  obtenerPaginas(): number[] {
    let startPage = Math.max(1, this.pagina_actual - Math.floor(this.visiblePages / 2));
    let endPage = Math.min(this.paginas_totale, startPage + this.visiblePages - 1);
    if (endPage - startPage + 1 < this.visiblePages) {
      startPage = Math.max(1, endPage - this.visiblePages + 1);
    }
    const paginas = [];
    for (let i = startPage; i <= endPage; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  //Generar PDF
  async generar_pdf(){
    let usuarios:Usuario[]=[];
    const data = await this.usuarioservice.obtenerUsuarios().toPromise();
    usuarios = data.object;

    const doc = new jsPDF();
    const fontSize = 12;
    doc.setFontSize(fontSize);
    doc.text('Tabla de usuarios', centrar('Tabla de usuarios',doc), 20);
    drawUnderline(doc,'Tabla de usuarios',20,fontSize);
    
    const filteredLoans = usuarios.map(({ userId,nombreCompleto,correo,cargo }, index) => ({
      "Nro": index + 1,
      "userId":userId ?? 0,
      "Nombre":nombreCompleto ?? "",
      "Email":correo ?? "",
      "Cargo":cargo?.nombre ?? ""
    }));
    
    const headers = Object.keys(filteredLoans[0]);
    const rows = filteredLoans.map(usuarios => Object.values(usuarios));

    autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 30,
        didDrawCell: (dataa) => { },
    });

    doc.save(`tabla_usuarios_${hora_actual()}.pdf`);

  }

  //Exportar Excel
  async exportar_excel(){
    let usuarios:Usuario[]=[];
    const data = await this.usuarioservice.obtenerUsuarios().toPromise();
    usuarios = data.object ?? [];

    const filteredLoans = usuarios.map(({ userId,nombreCompleto,correo,cargo }, index) => ({
      "Nro": index + 1,
      "userId":userId ?? 0,
      "Nombre":nombreCompleto ?? "",
      "Email":correo ?? "",
      "Cargo":cargo?.nombre ?? ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredLoans);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

    XLSX.writeFile(workbook, `tabla_usuarios_${hora_actual()}.xlsx`);
  }

}
