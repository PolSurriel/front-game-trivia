// Angular core imports
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-multi-selector',
  templateUrl: './multi-selector.component.html',
  styleUrls: ['./multi-selector.component.scss']
})
export class MultiSelectorComponent {

  @Input() options: string[]; // List of options available for selection
  protected selectedOptions: string[] = []; // Current selected options by the user
  protected filterTerm: string = ''; // Potential property for future feature to filter options

  @Output() onOptionsChange = new EventEmitter<string[]>(); // Event emitter to notify the parent component of selection changes

  /**
   * Adds a selected option to the selectedOptions array if it doesn't already exist.
   * Then emits the current state of selectedOptions to the parent component.
   * 
   * @param option The option selected by the user
   */
  protected selectOption(option: string) {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions = [...this.selectedOptions, option];
    }
    this.onOptionsChange.emit(this.selectedOptions);
  }

  /**
   * Removes a selected option from the selectedOptions array.
   * Then emits the updated state of selectedOptions to the parent component.
   * 
   * @param option The option to be removed
   */
  protected removeOption(option: string) {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    this.onOptionsChange.emit(this.selectedOptions);
  }
}
