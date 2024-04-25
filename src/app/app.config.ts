import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './header.interceptor';
import { spinnerInterceptor } from './shared/interceptor-spinner/spinner.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([HttpClientModule]),
    provideHttpClient(withInterceptors([headerInterceptor,spinnerInterceptor])), provideAnimationsAsync()]
};
