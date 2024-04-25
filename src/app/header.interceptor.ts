import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken =localStorage.getItem("jwt");
  let authReq;

  if(authToken==null||authToken==""){
    authReq = req.clone({
      setHeaders: {
      }
    });
  }
  else{
    authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

  return next(authReq);
  
};
