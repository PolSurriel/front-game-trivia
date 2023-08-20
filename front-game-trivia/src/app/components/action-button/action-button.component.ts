import { Component, Input,Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ColorPalette } from 'src/app/shared/models/ColorPalette';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent {

  @Input() type: string;
  @Input() mode: string;

  @ViewChild('buttonRef') buttonRef: ElementRef;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {

    let palette: ColorPalette = ColorPalette.getPalette(this.type);
    this.buttonRef.nativeElement.style.setProperty('--font-color', palette.font);
    this.buttonRef.nativeElement.style.setProperty('--bg-color', palette.main);
    this.buttonRef.nativeElement.style.setProperty('--border-color', palette.detail);
    this.buttonRef.nativeElement.style.setProperty('--shadow-color', palette.detailSecondary);
    
    if (this.mode === 'compact') {
      this.buttonRef.nativeElement.style.padding = '5px';
    }
  }

}
