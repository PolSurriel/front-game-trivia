import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up-section',
  templateUrl: './pop-up-section.component.html',
  styleUrls: ['./pop-up-section.component.scss']
})
export class PopUpSectionComponent {

  opened : boolean = false;

  @Output() onClose = new EventEmitter<void>();

  public open() {
    this.opened = true;
  }

  public close() {
    this.opened = false;
    this.onClose.emit();
  }


}
