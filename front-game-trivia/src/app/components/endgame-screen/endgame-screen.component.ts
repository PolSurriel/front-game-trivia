import { Component } from '@angular/core';

@Component({
  selector: 'app-endgame-screen',
  templateUrl: './endgame-screen.component.html',
  styleUrls: ['./endgame-screen.component.scss']
})
export class EndgameScreenComponent {

  correctAmount : number = 3;
  totalAmount : number = 5;
  percentageCorrect : number = 60;

  gameHistory : any[] = ["a","b","c","d","e"];
}
