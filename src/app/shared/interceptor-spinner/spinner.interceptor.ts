import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerServiceService } from './spinner-service.service';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinerservie=inject(SpinnerServiceService);
  spinerservie.show();
  return next(req).pipe(
    finalize(()=> spinerservie.hide())
  );
};
