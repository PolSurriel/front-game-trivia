import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import{ PopUpSectionComponent } from '../pop-up-section/pop-up-section.component';

@Component({
  selector: 'app-category-selector-input',
  templateUrl: './category-selector-input.component.html',
  styleUrls: ['./category-selector-input.component.scss']
})
export class CategorySelectorInputComponent {
  
  @ViewChild(PopUpSectionComponent) popUpRef: PopUpSectionComponent;
  
  radioModel : string = 'all';
  possibleCategories : string[] = ["science","film_and_tv","music","history","geography","arts_and_literature","sport_and_leisure","general_knowledge","science","food_and_drink"];
  customSelection : string[] = this.possibleCategories;

  @Output() onCategoryChange = new EventEmitter<string[]>();

  selectCategory(category : string) {
    if(category === 'all'){
      this.customSelection = this.possibleCategories;
      this.onCategoryChange.emit(this.possibleCategories);
    }else {
      this.popUpRef.open();
    }
  }

  onPopupClose(){
    if(this.customSelection.toString() === this.possibleCategories.toString()){
      this.radioModel = 'all';
      this.customSelection = this.possibleCategories;
    }
    this.onCategoryChange.emit(this.customSelection);
  }

  categoryMultiSelectionChanges(selection : string[]){
    this.customSelection = selection;
  }

}
