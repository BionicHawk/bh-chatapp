import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [SubmitButtonComponent],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
export class CardFormComponent {
  @Input() title: string = "No title";
  @Output() submitEvent = new EventEmitter();
  
  onSubmit() {
    this.submitEvent.emit();
  }

}
