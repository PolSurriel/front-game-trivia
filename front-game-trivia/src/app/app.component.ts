import { Component, ViewChild } from '@angular/core';
import { QuestionScreenComponent } from './components/question-screen/question-screen.component';
import { EndgameScreenComponent } from './components/endgame-screen/endgame-screen.component';
import { MatchClientService } from './services/match-client.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-game-trivia';

  currentScreen : string = 'welcome';
  gameSettings : any;
  currentQuestion : number = 0;
  gameHistory : any;

  @ViewChild(QuestionScreenComponent) questionScreen : QuestionScreenComponent;
  @ViewChild(EndgameScreenComponent) endgameScreen : EndgameScreenComponent;

  constructor(
    private matchClientService : MatchClientService
  ){}


  shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  
  onStartGame(gameSettings : any) {

    for (let i = 0; i < gameSettings.questions.length; i++) {
      gameSettings.questions[i].answers = 
        this.shuffleArray(gameSettings.questions[i].answers);
      
    }

    this.gameSettings = gameSettings;
    this.currentQuestion = 0;
    this.currentScreen = 'question';

  }

  onQuestionAnswered() {

    if(this.currentQuestion == this.gameSettings.questions.length - 1) {
      this.matchClientService.finishGame(this.gameSettings.id).subscribe((response : any) => {
        this.matchClientService.getGameById(this.gameSettings.id)
          .subscribe((gameHistory : any) => {
            this.currentScreen = 'endgame';
            this.gameHistory = gameHistory;
          },
          (error : any) => {
            console.log(error);
          });
        
      });
    }else {
      this.currentQuestion++;
      this.questionScreen.onNextQuestionPressed();
    }

  }

  onGameResumeGoBackClicked(){
    this.currentScreen = 'welcome';
  }

  onGameClose(){
    
    this.currentScreen = 'welcome';
    this.matchClientService.finishGame(this.gameSettings.gameId);
  }

}
