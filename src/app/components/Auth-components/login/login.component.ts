import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  miFormulario!: FormGroup;
  formmmbuilder:any;
  status:String="";
  txt:String="";

  constructor(private formBuilder: FormBuilder,private authservice:AuthService,private router:Router) {
    this.formmmbuilder=this.formBuilder
  }

  ngOnInit(): void {
    this.miFormulario = this.formmmbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required]]
    });
  }

  enviarFormulario() {
    if (this.miFormulario.valid) {

      const usuario: Usuario = {
        correo: this.miFormulario.value.email,
        contraseña: this.miFormulario.value.contraseña
      };

      this.authservice.login(usuario).subscribe((data:any)=>{
        this.txt=data.mensaje;
        this.status="success";
        localStorage.setItem("jwt",data.object);
        setTimeout(()=>{
          this.router.navigateByUrl("/home");
        }, 1000);
      },(error:any) => {
        this.txt=error.error.mensaje;
        this.status="error";
      })

    } 
  }

}
