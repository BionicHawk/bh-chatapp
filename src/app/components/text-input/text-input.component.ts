import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
onInputChange(value: string) {
  console.log(value)
  this.valueEmmiter.emit(value);
}
  @Input() label: string = 'Unknown';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() pattern?: string;
  @Input() required: 'true' | 'false' = 'false';
  @Output() valueEmmiter = new EventEmitter<string>();
}