import { Observable } from "rxjs";
import { GameInfo } from "../models/GameInfo";
import { MatchClientService } from "./match-client.service";
import { InjectionToken } from "@angular/core";

export const IMatchClientServiceToken = new InjectionToken<IMatchClientService>('IMatchClientServiceToken');
export const IMatchClientServiceTokenProvider = { provide: IMatchClientServiceToken, useClass: MatchClientService };

export interface IMatchClientService {
  createNewGame(amount: number, difficulty: string, categories: string[]): Observable<GameInfo>;
  answerQuestion(gameId: number, questionIndex: number, answerId: number): Observable<any>;
  finishGame(gameId: number): Observable<any>;
  getGameById(gameId: number): Observable<GameInfo>;
}