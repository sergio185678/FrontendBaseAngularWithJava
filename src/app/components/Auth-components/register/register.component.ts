import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  miFormulario!: FormGroup;
  formmmbuilder:any;
  status:String="";
  txt:String="";

  constructor(private formBuilder: FormBuilder,private authservice:AuthService,private userservice:UsuarioService,private router:Router) {
    this.formmmbuilder=this.formBuilder;
  }

  ngOnInit(): void {
    this.miFormulario = this.formmmbuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required]],
      confirmcontra: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator // Validador personalizado para comparar contraseñas
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const contraseña = formGroup.get('contraseña');
    const confirmar_contraseña = formGroup.get('confirmcontra');

    // Verificar si los campos existen y tienen valor
    if (contraseña && confirmar_contraseña && contraseña.value !== confirmar_contraseña.value) {
      confirmar_contraseña.setErrors({ passwordMismatch: true });
    } else {
      confirmar_contraseña!.setErrors(null);
    }
  }

  enviarFormulario() {
    if (this.miFormulario.valid) {

      const usuario: Usuario = {
        nombreCompleto: this.miFormulario.value.nombre,
        correo: this.miFormulario.value.email,
        contraseña: this.miFormulario.value.contraseña,
        cargoid:2
      };

      this.authservice.registrar(usuario).subscribe((data:any)=>{
        this.txt=data.mensaje;
        this.status="success";
        setTimeout(()=>{
          this.router.navigateByUrl("/login");
        }, 2000);
      },(error:any) => {
        this.txt=error.error.mensaje;
        this.status="error";
      })
      
    } 
  }

}
