// Angular imports
import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Difficulty } from 'src/app/enums/difficulty.enum';

@Component({
  selector: 'app-difficulty-input',
  templateUrl: './difficulty-input.component.html',
  styleUrls: ['./difficulty-input.component.scss']
})
export class DifficultyInputComponent {

  // Exporting the enum to be used in the template
  protected Difficulty = Difficulty;

  // References to the individual difficulty option elements in the template
  @ViewChild('easyOption') easyOption: ElementRef;
  @ViewChild('mediumOption') mediumOption: ElementRef;
  @ViewChild('hardOption') hardOption: ElementRef;

  // Output event emitter to notify parent component about the change in selected difficulty
  @Output() onSelectedDifficultyChange = new EventEmitter<string>();

  /**
   * Method to select a difficulty option and update visual styles accordingly
   * @param selected - string value representing the difficulty selected
   */
  protected selectOption(selected: Difficulty): void {
    // Remove any existing positional classes from the options
    this.removePositionalClasses();

    // Depending on the selected difficulty, add the appropriate positional classes
    switch (selected) {
      case Difficulty.EASY:
        this.easyOption.nativeElement.classList.add('first');
        this.mediumOption.nativeElement.classList.add('second');
        this.hardOption.nativeElement.classList.add('third');
        break;

      case Difficulty.MEDIUM:
        this.mediumOption.nativeElement.classList.add('first');
        this.hardOption.nativeElement.classList.add('second');
        this.easyOption.nativeElement.classList.add('third');
        break;

      case Difficulty.HARD:
        this.hardOption.nativeElement.classList.add('first');
        this.easyOption.nativeElement.classList.add('second');
        this.mediumOption.nativeElement.classList.add('third');
        break;
    }

    // Emit the selected difficulty to the parent component
    this.onSelectedDifficultyChange.emit(selected);
  }

  /**
   * Helper method to remove positional classes from the difficulty options.
   * Ensures that no previous styles interfere with the new selection.
   */
  private removePositionalClasses(): void {
    ['first', 'second', 'third'].forEach(className => {
      this.easyOption.nativeElement.classList.remove(className);
      this.mediumOption.nativeElement.classList.remove(className);
      this.hardOption.nativeElement.classList.remove(className);
    });
  }
}
