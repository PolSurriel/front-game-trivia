import { Component } from '@angular/core';

@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.scss']
})
export class QuestionScreenComponent {

  question : string = '¿Pregunta?';
  answers : string[] = ['A', 'B', 'C', 'D'];

  constructor() { }

}
