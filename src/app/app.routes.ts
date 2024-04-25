import { Routes } from '@angular/router';
import { authguardGuard } from './guards/authguard.guard';
import { authguestGuard } from './guards/authguest.guard';

export const routes: Routes = [
    {path:"inicio",loadComponent:()=>import("./components/Inicio-components/inicio/inicio.component").then((c)=>c.HomeComponent),canActivate:[authguardGuard]},
    {path:"login",loadComponent:()=>import("./components/Auth-components/login/login.component").then((c)=>c.LoginComponent),canActivate:[authguestGuard]},
    {path:"register",loadComponent:()=>import("./components/Auth-components/register/register.component").then((c)=>c.RegisterComponent),canActivate:[authguestGuard]},
    {path:"cargos",loadComponent:()=>import("./components/Cargo-components/cargos/cargos.component").then((c)=>c.CargosComponent),canActivate:[authguardGuard]},
    {path:"cargo/:id",loadComponent:()=>import("./components/Cargo-components/cargo/cargo.component").then((c)=>c.CargoComponent),canActivate:[authguardGuard]},
    {path:"perfil",loadComponent:()=>import("./components/perfil/perfil.component").then((c)=>c.PerfilComponent),canActivate:[authguardGuard]},
    {path:"**",redirectTo:"/inicio",pathMatch:"full"}
];
