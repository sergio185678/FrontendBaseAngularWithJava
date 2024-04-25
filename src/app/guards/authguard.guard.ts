import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authguardGuard: CanActivateFn = (route, state) => {

  const routerr=inject(Router);

  if(localStorage.getItem("jwt")==null||localStorage.getItem("jwt")==""){
    routerr.navigateByUrl("/login");
    return false;
  }

  const authService=inject(AuthService);
  
  return authService.autentificar().subscribe((data:any)=>{
    if(data==true){
      return true;
    }
    else{
      routerr.navigateByUrl("/login");
      return false;
    }
  })
  
};
