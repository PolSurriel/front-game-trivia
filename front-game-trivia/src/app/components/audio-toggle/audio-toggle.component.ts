import { Component } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';


@Component({
  selector: 'app-audio-toggle',
  templateUrl: './audio-toggle.component.html',
  styleUrls: ['./audio-toggle.component.scss']
})
export class AudioToggleComponent {

  audioOn: boolean = false;

  constructor(private audioService: AudioService) { }

  onClick(event: Event){
    this.audioOn = !this.audioOn;
    this.audioService.setSoundsActive(this.audioOn);
    event.stopPropagation();
  }

}
