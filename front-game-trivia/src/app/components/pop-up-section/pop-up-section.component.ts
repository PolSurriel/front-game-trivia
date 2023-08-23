// Angular core imports
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pop-up-section',
  templateUrl: './pop-up-section.component.html',
  styleUrls: ['./pop-up-section.component.scss']
})
export class PopUpSectionComponent {

  // Property to determine if the pop-up is currently opened or closed
  protected opened: boolean = false;

  // Event emitted to notify the parent component when the pop-up is closed
  @Output() onClose = new EventEmitter<void>();
  @Input() closeCallback?: () => void;

  /**
   * Opens the pop-up by setting the 'opened' property to true.
   */
  public open() {
    this.opened = true;
  }

  /**
   * Closes the pop-up by setting the 'opened' property to false.
   * Also emits an onClose event to inform the parent component of the closure.
   */
  public close() {
    this.opened = false;
    this.onClose.emit();
    this.closeCallback?.call(this);
  }
}
