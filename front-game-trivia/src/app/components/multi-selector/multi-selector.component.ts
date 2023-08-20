import { Component } from '@angular/core';

@Component({
  selector: 'app-multi-selector',
  templateUrl: './multi-selector.component.html',
  styleUrls: ['./multi-selector.component.scss']
})
export class MultiSelectorComponent {
  options: string[] = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];  // Puedes modificar esta lista como quieras
  selectedOptions: string[] = [];
  filterTerm: string = '';

  selectOption(option: string) {
    if (!this.selectedOptions.includes(option)) {
      this.selectedOptions = [...this.selectedOptions, option];
    }
  }

  removeOption(option: string) {
    this.selectedOptions = this.selectedOptions.filter(item => item !== option);
  }
}
