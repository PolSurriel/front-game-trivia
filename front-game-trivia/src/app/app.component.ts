// Angular core imports
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

  // Current screen in the game (e.g., welcome, question, endgame)
  currentScreen: string = 'welcome';
  
  // Game configuration settings
  gameSettings: any;
  
  // Index of the current question being displayed
  currentQuestion: number = 0;
  
  // History of the game, including questions and answers
  gameHistory: any;

  // References to child components
  @ViewChild(QuestionScreenComponent) questionScreen: QuestionScreenComponent;
  @ViewChild(EndgameScreenComponent) endgameScreen: EndgameScreenComponent;

  constructor(
    private matchClientService: MatchClientService
  ) {}

  // Utility method to shuffle an array
  shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  // Handler for starting the game
  onStartGame(gameSettings: any) {
    // Shuffle answers for each question
    for (let i = 0; i < gameSettings.questions.length; i++) {
      gameSettings.questions[i].answers = this.shuffleArray(gameSettings.questions[i].answers);
    }

    this.gameSettings = gameSettings;
    this.currentQuestion = 0;
    this.currentScreen = 'question';
  }

  // Handler for when a question has been answered
  onQuestionAnswered() {
    // If it was the last question, fetch game history and move to endgame screen
    if (this.currentQuestion == this.gameSettings.questions.length - 1) {
      this.matchClientService.finishGame(this.gameSettings.id).subscribe((response: any) => {
        this.matchClientService.getGameById(this.gameSettings.id)
          .subscribe((gameHistory: any) => {
            this.currentScreen = 'endgame';
            this.gameHistory = gameHistory;
          },
          (error: any) => {
            console.log(error);
          });
      });
    } else {
      // Otherwise, move to the next question
      this.currentQuestion++;
      this.questionScreen.onNextQuestionPressed();
    }
  }

  // Handler for when the "go back" button is pressed on the game resume screen
  onGameResumeGoBackClicked() {
    this.currentScreen = 'welcome';
  }

  // Handler for when the game is closed
  onGameClose() {
    this.currentScreen = 'welcome';
    this.matchClientService.finishGame(this.gameSettings.gameId);
  }
}
