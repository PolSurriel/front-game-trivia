// Angular core imports
import { Component, ViewChild  } from '@angular/core';
import { QuestionScreenComponent } from './components/question-screen/question-screen.component';
import { EndgameScreenComponent } from './components/endgame-screen/endgame-screen.component';
import { MatchClientService } from './services/match-client.service';
import { GameInfo as GameInfo } from './models/GameInfo';
import { ArrayUtilitiesService } from './services/array-utilities.service';
import { GameService } from './services/game.service';

enum Screen{
  Welcome = 'welcome',
  Question = 'question',
  Endgame = 'endgame'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Trivy';

  // Current screen in the game (e.g., welcome, question, endgame)
  currentScreen: Screen = Screen.Welcome;
  
  // Game configuration settings
  gameSettings: GameInfo;
  
  // Index of the current question being displayed
  currentQuestion: number = 0;
  
  // History of the game, including questions and answers
  gameHistory: GameInfo;

  // References to child components
  @ViewChild(QuestionScreenComponent) questionScreen: QuestionScreenComponent;
  @ViewChild(EndgameScreenComponent) endgameScreen: EndgameScreenComponent;

  constructor(
    private matchClientService: MatchClientService,
    private arrayUtilitiesService: ArrayUtilitiesService,
    private gameService: GameService
  ) {}

 

  // Handler for starting the game
  onStartGame(gameSettings: GameInfo) {
    // Shuffle answers for each question
    for (let i = 0; i < gameSettings.questions.length; i++) {
      gameSettings.questions[i].answers = 
        this.arrayUtilitiesService.shuffleArray(gameSettings.questions[i].answers);
    }

    this.gameSettings = gameSettings;
    this.currentQuestion = 0;
    this.currentScreen = Screen.Question;
  }

  // Handler for when a question has been answered
  onQuestionAnswered() {
    // If it was the last question, fetch game history and move to endgame screen
    if (this.currentQuestion == this.gameSettings.questions.length - 1) {
      this.matchClientService.finishGame(this.gameSettings.id).subscribe((response: any) => {
        this.matchClientService.getGameById(this.gameSettings.id)
          .subscribe((data: any) => {
            this.currentScreen = Screen.Endgame;
            this.gameHistory = data as GameInfo;
            
          },
          (error: any) => {
            console.log(error);
            alert('An error occurred while fetching game history.');
            
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
    this.currentScreen = Screen.Welcome;
  }

  // Handler for when the game is closed
  onGameClose() {
    this.currentScreen = Screen.Welcome;
    this.matchClientService.finishGame(this.gameSettings.id);
  }
}
