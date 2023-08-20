import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatchClientService } from 'src/app/services/match-client.service';
import { CategorySelectorInputComponent } from '../category-selector-input/category-selector-input.component';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent {

  config : any = {
    amount : 5,
    category : [],
    difficulty : 'easy'
  };

  animationCloseScreenDuration : number = 500;

  @Output() onStartGameEvent = new EventEmitter<any>();
  
  @ViewChild(CategorySelectorInputComponent) categorySelector : CategorySelectorInputComponent;
  @ViewChild('container') container : ElementRef;

  readyToClose : boolean = false;

  constructor(
    private matchClientService : MatchClientService
  ) { }

  ngAfterViewInit(): void {
    this.config.category = this.categorySelector.customSelection;
  }

  onQuestionAmountChange(amount : number) {
    this.config.amount = amount;
  }

  onSelectedDifficultyChange(difficulty : string) {
    this.config.difficulty = difficulty;
  }

  onQuestionCategoryChange(category : string[]) {
    this.config.category = category;
  }

  onStartGame(game: any){
    if(this.readyToClose){
      this.onStartGameEvent.emit(game);
    }else {
      setTimeout(() => {
        this.onStartGame(game);
      }, this.animationCloseScreenDuration);
    }

  }

  onPlayClick(){
    this.container.nativeElement.classList.add('hide');
    this.readyToClose = false;
    setTimeout(() => {
      this.readyToClose = true;
    }, this.animationCloseScreenDuration);

    this.matchClientService
      .createNewGame(
        this.config.amount,
        this.config.difficulty,
        this.config.category
      ).subscribe(
        (data) => {
          this.onStartGame(data);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

}
