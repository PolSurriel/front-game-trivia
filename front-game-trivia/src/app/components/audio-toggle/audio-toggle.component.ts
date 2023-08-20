import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-toggle',
  templateUrl: './audio-toggle.component.html',
  styleUrls: ['./audio-toggle.component.scss']
})
export class AudioToggleComponent {

  audioOn: boolean = false;

  onClick(event: Event){
    this.audioOn = !this.audioOn;
    console.log(this.audioOn);
    event.stopPropagation();
  }

}
