import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InterceptorSpinnerComponent } from './shared/interceptor-spinner/interceptor-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,InterceptorSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontBaseForBackend';
}
