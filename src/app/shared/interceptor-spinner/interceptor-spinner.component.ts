import { Component } from '@angular/core';
import { SpinnerServiceService } from './spinner-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interceptor-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interceptor-spinner.component.html',
  styleUrl: './interceptor-spinner.component.css'
})
export class InterceptorSpinnerComponent {

  isLoading$= this.spinnerservie.isLoading$;

  constructor(private spinnerservie:SpinnerServiceService) {}
}
