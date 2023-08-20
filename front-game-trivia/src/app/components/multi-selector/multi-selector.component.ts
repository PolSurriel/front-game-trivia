import { Component, EventEmitter, Output, Input  } from '@angular/core';

@Component({
  selector: 'app-multi-selector',
  templateUrl: './multi-selector.component.html',
  styleUrls: ['./multi-selector.component.scss']
})
export class MultiSelectorComponent {
  @Input() options: string[];
  selectedOptions: string[] = [];
  filterTerm: string = '';

  @Output() onOptionsChange = new EventEmitter<string[]>();

  selectOption(option: string) {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions = [...this.selectedOptions, option];
    }
    this.onOptionsChange.emit(this.selectedOptions);
  }

  removeOption(option: string) {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option);
    this.onOptionsChange.emit(this.selectedOptions);
  }
}
