// Angular imports
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { POSSIBLE_CATEGORIES } from 'src/app/constants/categories.constants';
import { ArrayUtilitiesService } from 'src/app/services/array-utilities.service';

// Application specific imports
import { PopUpSectionComponent } from '../pop-up-section/pop-up-section.component';


enum RadioModel {
  All = 'all',
  Custom = 'custom'
  // ... otros valores si es necesario
}

@Component({
  selector: 'app-category-selector-input',
  templateUrl: './category-selector-input.component.html',
  styleUrls: ['./category-selector-input.component.scss']
})
export class CategorySelectorInputComponent {

  // Exporting the enum to be used in the template
  protected RadioModel = RadioModel;

  // Reference to the PopUpSectionComponent for showing a popup
  @ViewChild(PopUpSectionComponent) popUpRef: PopUpSectionComponent;

  // Default radio selection value
  protected radioModel: RadioModel = RadioModel.All;

  // Custom categories selected by the user
  protected _customSelection: string[] = POSSIBLE_CATEGORIES;
  

  // getterr
  get customSelection() {
    return this._customSelection;
  }    
  
  // justo to bind the possible categories to the template
  protected readonly possibleCategories = POSSIBLE_CATEGORIES;

  // Output event emitter to notify the parent component when category changes
  @Output() onCategoryChange = new EventEmitter<string[]>();

  constructor(
    private arrayUtilitiesService: ArrayUtilitiesService
  ) { }

  // Method to handle when a category is selected
  protected selectCategory(category: string) {
    if (category === 'all') {
      this._customSelection = POSSIBLE_CATEGORIES;
      // Emitting all possible categories if 'all' is selected
      this.onCategoryChange.emit(POSSIBLE_CATEGORIES);
    } else {
      // Open the pop-up to allow custom selection
      this.popUpRef.open();
    }
  }

  // Method to handle when the popup is closed
  protected onPopupClose() {
    // Check if custom selection is same as all possible categories
    if (this.arrayUtilitiesService.sameValues(this._customSelection, POSSIBLE_CATEGORIES)) {
      this.radioModel = RadioModel.All;
      this._customSelection = POSSIBLE_CATEGORIES;
    }

    // Emit the custom selections to the parent component
    this.onCategoryChange.emit(this._customSelection);
  }

  // Method to update the custom selection when changes are made in multi-selector
  protected categoryMultiSelectionChanges(selection: string[]) {
    this._customSelection = selection;
  }
}
