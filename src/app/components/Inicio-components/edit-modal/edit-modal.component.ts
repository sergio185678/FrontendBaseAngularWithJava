import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { CargoService } from '../../../services/cargo.service';
import { Cargo } from '../../../models/cargo';
import { Documento } from '../../../models/documento';
import { DocumentoService } from '../../../services/documento.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent implements OnInit {

  miFormulario!: FormGroup;
  status:String="";
  txt:String="";
  opcionesCargos:Cargo[]=[];
  documentos:Documento[]=[];
  verlistadocs=false;
  selectedFile!: File;
  tipo_archivo:string = "";
  seccionagregar:boolean = false;
  idDocumento:number=0;
  modalEliminar=false;

  @Output() cerrarModal = new EventEmitter<void>();
  @Input() idusuario!:number;

  constructor(private formBuilder: FormBuilder,private userservice:UsuarioService,private router:Router,private cargoservice:CargoService,private documentoservice:DocumentoService){
    this.miFormulario = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      cargoid: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userservice.obtenerUsuario(this.idusuario).subscribe((data)=>{
      this.miFormulario.patchValue({
        nombre: data.object.nombreCompleto,
        cargoid:data.object.cargo.cargoId.toString()
      });
    })
    this.cargoservice.obtenerCargos().subscribe((data)=>{
      this.opcionesCargos=data.object;
    })
  }

  enviarFormulario() {
    if (this.miFormulario.valid) {
      const usuario: Usuario = {
        nombreCompleto: this.miFormulario.value.nombre,
        cargoid: parseInt(this.miFormulario.value.cargoid)
      };
      this.userservice.editarUsuario(this.idusuario,usuario).subscribe((data:any)=>{
        this.txt=data.mensaje;
        this.status="success";
        setTimeout(()=>{
          location.reload();
        }, 1000);
      })
    } 
  }

  cerrar() {
    this.cerrarModal.emit();
  }

  verDocumentos(){
    this.verlistadocs=true;
    this.documentoservice.obtenerDocumentosPorUsuario(this.idusuario).subscribe((data)=>{
      this.documentos=data.object;
    })
  }

  verInformacion(){
    this.verlistadocs=false;
  }

  abrirModalEliminar(id:any){
    this.idDocumento=id;
    this.modalEliminar=true;
  }

  cerrarModalEliminar() {
    this.modalEliminar=false;
  }

  async eliminar(){
    await this.documentoservice.eliminarDocumento(this.idDocumento).toPromise();
    this.verDocumentos();
    this.modalEliminar=false;
  }

  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0];
  }

  submitFile(event:any): void {
    event.preventDefault();
    if(this.tipo_archivo!="" && this.selectedFile!=undefined){
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('tipo', this.tipo_archivo);
      formData.append('usuarioid', String(this.idusuario));

      this.documentoservice.registrarDocumento(formData).subscribe((data)=>{
        this.seccionagregar=false;
        this.txt=data.mensaje;
        this.status="success";
        this.verDocumentos();
        setTimeout(()=>{
          this.txt="";
          this.status="";
        }, 2000);
      })
    }
  }

  abrirSeccionAgregar(){
    this.seccionagregar=true;
  }
}
