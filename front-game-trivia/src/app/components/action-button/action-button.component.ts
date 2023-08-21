// Angular imports
import { Component, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';

// Application specific imports
import { ColorPalette } from 'src/app/shared/models/ColorPalette';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent {

  // Inputs: for receiving data from parent components
  @Input() type: string;
  @Input() mode: string;

  // View reference to the button element
  @ViewChild('buttonRef') buttonRef: ElementRef;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  // Lifecycle hook to handle tasks after the component's view has been fully initialized
  ngAfterViewInit() {
    // Get color palette based on type
    let palette: ColorPalette = ColorPalette.getPalette(this.type);

    // Set style properties based on the palette
    this.buttonRef.nativeElement.style.setProperty('--font-color', palette.font);
    this.buttonRef.nativeElement.style.setProperty('--bg-color', palette.main);
    this.buttonRef.nativeElement.style.setProperty('--border-color', palette.detail);
    this.buttonRef.nativeElement.style.setProperty('--shadow-color', palette.detailSecondary);

    // Adjust styles based on mode
    if (this.mode === 'compact') {
      this.buttonRef.nativeElement.style.padding = '5px';
      this.buttonRef.nativeElement.style.fontSize = '5px';
    } else if (this.mode === 'thin') {
      this.buttonRef.nativeElement.style.padding = '10px';
      this.buttonRef.nativeElement.style.fontSize = '20px';
    }
  }

  // Method to handle button click
  onCLick() {
    // Add 'clicked' class to button
    this.buttonRef.nativeElement.classList.add('clicked');
    
    // Remove 'clicked' class after 200ms
    setTimeout(() => {
      this.buttonRef.nativeElement.classList.remove('clicked');
    }, 200);
  }
}
