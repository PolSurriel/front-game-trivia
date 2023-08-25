// Angular imports
import { Component, Inject } from '@angular/core';

// Application specific imports
import { IAudioService, IAudioServiceToken } from 'src/app/services/iaudio.service';

@Component({
  selector: 'app-audio-toggle',
  templateUrl: './audio-toggle.component.html',
  styleUrls: ['./audio-toggle.component.scss']
})
export class AudioToggleComponent {

  // Property to keep track if the audio is ON or OFF
  protected audioOn: boolean;

  // Inject the AudioService into the component
  constructor(
    @Inject(IAudioServiceToken) private audioService: IAudioService
    ) { }

  ngOnInit(): void {
    // Subscribe to the audio state change event
    this.audioService.soundsOn.subscribe((state) => {
      // Update the audioOn property
      this.audioOn = state;
    });
  }

  // Method to handle the click event on the audio toggle button
  protected onClick(event: Event) {
    // Inform the audio service about the change in audio state
    this.audioService.setSoundsActive(!this.audioOn);

    // Stop the event propagation so that any parent listeners don't get triggered
    event.stopPropagation();
  }
}
