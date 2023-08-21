import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private failSound : HTMLAudioElement = new Audio('assets/audio/fail.mp3');
  private successSound : HTMLAudioElement = new Audio('assets/audio/success.mp3');
  private endSound : HTMLAudioElement = new Audio('assets/audio/endgame.mp3');
  private confettiSound : HTMLAudioElement = new Audio('assets/audio/confetti.mp3');

  soundsOn : boolean = false;

  constructor() { }

  public setSoundsActive(soundsOn : boolean) {
    this.soundsOn = soundsOn;
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
