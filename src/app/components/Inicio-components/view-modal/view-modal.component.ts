import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { jsPDF } from "jspdf";
import { centrar,drawUnderline } from "../../../shared/utils/pdf-utils";
import { Documento } from '../../../models/documento';
import { DocumentoService } from '../../../services/documento.service';
@Component({
  selector: 'app-view-modal',
  standalone: true,
  imports: [],
  templateUrl: './view-modal.component.html',
  styleUrl: './view-modal.component.css'
})
export class ViewModalComponent implements OnInit{

  usuario!:Usuario;
  documentos:Documento[]=[];
  verlistadocs=false;

  @Output() cerrarModal = new EventEmitter<void>();
  @Input() idusuario!:number;

  constructor(private usuarioservice:UsuarioService,private documentoservice:DocumentoService){
    
  }

  ngOnInit(): void {
    this.usuarioservice.obtenerUsuario(this.idusuario).subscribe((data)=>{
      this.usuario=data.object;
    })
  }
  
  cerrar() {
    this.cerrarModal.emit();
  }

  download(){
    const doc = new jsPDF();
    const fontSize = 12;
    doc.setFontSize(fontSize);
    doc.text('Información del Usuario', centrar('Información del Usuario',doc), 20);

    drawUnderline(doc,'Información del Usuario',20,fontSize);

    doc.text('Usuario Id:  '+this.usuario.userId, 20, 40);
    doc.text('Nombre Completo:  '+this.usuario.nombreCompleto, 20, 50);
    doc.text('Correo electrónico:  '+this.usuario.correo, 20, 60);
    doc.text('Cargo:  '+this.usuario.cargo?.nombre, 20, 70);
    
    doc.save('información_usuario_'+this.usuario.userId+'.pdf');
  }

  verdocumentos(){
    this.verlistadocs=true;
    this.documentoservice.obtenerDocumentosPorUsuario(this.idusuario).subscribe((data)=>{
      this.documentos=data.object;
    })
  }

  verinformacion(){
    this.verlistadocs=false;
  }

  dowloadPdf(documento:Documento) {

    this.documentoservice.descargarDocumento(documento.ruta ?? "").subscribe(response => {
      
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const partes = (documento.ruta ?? "").split(".");
      const extension = partes[partes.length - 1];
      link.download = documento.tipo+"_"+documento.usuarioid+"."+extension;
      link.click();
      window.URL.revokeObjectURL(url);
    }
    );
  }
}