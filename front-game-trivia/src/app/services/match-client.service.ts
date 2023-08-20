import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchClientService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  public getQuestionInfo(gameId: number, questionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/game/${gameId}/question/${questionId}`);
  }

  public answerQuestion(gameId: number, questionId: number, answerId: number): Observable<any> {
    let body = {
      answerId: answerId
    };
    console.log(body);
    return this.http.post(`${this.baseUrl}/game/${gameId}/question/${questionId}`, body);
  }

  public finishGame(gameId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/game/${gameId}/end`, {});
  }

  public getGameById(gameId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/game/${gameId}`);
  }

  public createNewGame(numberOfQuestions: number, difficulty:string, categories:string[]): Observable<any> {
    let body = {
      number_of_questions: numberOfQuestions,
      difficulty: difficulty,
      categories: categories
    };
    return this.http.post(`${this.baseUrl}/game`, body);
  }
}
