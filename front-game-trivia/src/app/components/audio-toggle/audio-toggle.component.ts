// Angular imports
import { Component } from '@angular/core';

// Application specific imports
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-audio-toggle',
  templateUrl: './audio-toggle.component.html',
  styleUrls: ['./audio-toggle.component.scss']
})
export class AudioToggleComponent {

  // Property to keep track if the audio is ON or OFF
  audioOn: boolean ;

  // Inject the AudioService into the component
  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
    this.audioOn = this.audioService.getSoundsActive();
  }

  // Method to handle the click event on the audio toggle button
  onClick(event: Event) {
    // Toggle the audioOn property
    this.audioOn = !this.audioOn;

    // Inform the audio service about the change in audio state
    this.audioService.setSoundsActive(this.audioOn);

    // Stop the event propagation so that any parent listeners don't get triggered
    event.stopPropagation();
  }
}
