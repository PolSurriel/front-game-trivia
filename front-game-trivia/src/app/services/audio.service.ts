import { Injectable } from '@angular/core';
import { IAudioService } from './iaudio.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService implements IAudioService {

  private failSound : HTMLAudioElement = new Audio('assets/audio/fail.mp3');
  private successSound : HTMLAudioElement = new Audio('assets/audio/success.mp3');
  private endSound : HTMLAudioElement = new Audio('assets/audio/endgame.mp3');
  private confettiSound : HTMLAudioElement = new Audio('assets/audio/confetti.mp3');

  private soundsOnChanged = new BehaviorSubject<boolean>(false);
  soundsOn : Observable<boolean> = this.soundsOnChanged.asObservable();

  constructor() { }

  public setSoundsActive(soundsOn : boolean) {
    this.soundsOnChanged.next(soundsOn);
  }

  public playFailSound() {
    if(this.soundsOn) {
      this.failSound.play();
    }
  }

  public playSuccessSound() {
    if(this.soundsOn) {
      this.successSound.play();
    }
  }

  public playEndSound() {
    if(this.soundsOn) {
      this.endSound.play();
      this.confettiSound.play();
    }
  }


}
