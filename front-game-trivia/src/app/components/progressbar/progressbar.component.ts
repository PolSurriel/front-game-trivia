// Angular core imports
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent {

  // Input property to receive the current progress value for the progress bar
  // By default, the progress is set to 10
  @Input() progress: number = 10;

}
