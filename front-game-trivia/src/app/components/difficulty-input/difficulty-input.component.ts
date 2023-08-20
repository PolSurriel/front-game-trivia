import { Component, ElementRef, ViewChild, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-difficulty-input',
  templateUrl: './difficulty-input.component.html',
  styleUrls: ['./difficulty-input.component.scss']
})
export class DifficultyInputComponent {

  @ViewChild('easyOption') easyOption: ElementRef;
  @ViewChild('mediumOption') mediumOption: ElementRef;
  @ViewChild('hardOption') hardOption: ElementRef;

  @Output() onSelectedDifficultyChange = new EventEmitter<string>();


  public selectOption(selected:string): void {

    this.removePositionalClasses();
    switch (selected) {
      case 'easy':
        this.easyOption.nativeElement.classList.add('first');
        this.mediumOption.nativeElement.classList.add('second');
        this.hardOption.nativeElement.classList.add('third');

        break;
      case 'medium':
        this.mediumOption.nativeElement.classList.add('first');
        this.hardOption.nativeElement.classList.add('second');
        this.easyOption.nativeElement.classList.add('third');
       
        break;
      case 'hard':
        this.hardOption.nativeElement.classList.add('first');
        this.easyOption.nativeElement.classList.add('second');
        this.mediumOption.nativeElement.classList.add('third');
       
        break;
    }

    this.onSelectedDifficultyChange.emit(selected);
    
  }

  private removePositionalClasses(): void {

    this.easyOption.nativeElement.classList.remove('first');
    this.mediumOption.nativeElement.classList.remove('first');
    this.hardOption.nativeElement.classList.remove('first');

    this.easyOption.nativeElement.classList.remove('second');
    this.mediumOption.nativeElement.classList.remove('second');
    this.hardOption.nativeElement.classList.remove('second');

    this.easyOption.nativeElement.classList.remove('third');
    this.mediumOption.nativeElement.classList.remove('third');
    this.hardOption.nativeElement.classList.remove('third');
  }

}
