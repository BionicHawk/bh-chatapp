import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-base',
  standalone: true,
  imports: [],
  templateUrl: './modal-base.component.html',
  styleUrl: './modal-base.component.css'
})
export class ModalBaseComponent {
  @Input() title: string = "No title";
  @Input() isOpen: boolean = true;
  @Input() isDismissible: boolean = true;
  @Output() onClose = new EventEmitter();
  
  closeModal(event: MouseEvent) {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (target.id === 'BlurScreen' && this.isDismissible) {
      this.isOpen = false;
      this.onClose.emit();
    }
  }
  
}
