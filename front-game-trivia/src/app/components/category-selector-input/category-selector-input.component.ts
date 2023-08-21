// Angular imports
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

// Application specific imports
import { PopUpSectionComponent } from '../pop-up-section/pop-up-section.component';

@Component({
  selector: 'app-category-selector-input',
  templateUrl: './category-selector-input.component.html',
  styleUrls: ['./category-selector-input.component.scss']
})
export class CategorySelectorInputComponent {
  
  // Reference to the PopUpSectionComponent for showing a popup
  @ViewChild(PopUpSectionComponent) popUpRef: PopUpSectionComponent;

  // Default radio selection value
  radioModel: string = 'all';

  // List of all possible categories for selection
  possibleCategories: string[] = ["film_and_tv", "music", "history", "geography", "arts_and_literature", "sport_and_leisure", "general_knowledge", "science", "food_and_drink"];

  // Custom categories selected by the user
  customSelection: string[] = this.possibleCategories;

  // Output event emitter to notify the parent component when category changes
  @Output() onCategoryChange = new EventEmitter<string[]>();

  // Method to handle when a category is selected
  selectCategory(category: string) {
    if (category === 'all') {
      this.customSelection = this.possibleCategories;
      // Emitting all possible categories if 'all' is selected
      this.onCategoryChange.emit(this.possibleCategories);
    } else {
      // Open the pop-up to allow custom selection
      this.popUpRef.open();
    }
  }

  // Method to handle when the popup is closed
  onPopupClose() {
    // Check if custom selection is same as all possible categories
    if (this.customSelection.toString() === this.possibleCategories.toString()) {
      this.radioModel = 'all';
      this.customSelection = this.possibleCategories;
    }

    // Emit the custom selections to the parent component
    this.onCategoryChange.emit(this.customSelection);
  }

  // Method to update the custom selection when changes are made in multi-selector
  categoryMultiSelectionChanges(selection: string[]) {
    this.customSelection = selection;
  }
}
