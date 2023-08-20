import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioToggleComponent } from './audio-toggle.component';

describe('AudioToggleComponent', () => {
  let component: AudioToggleComponent;
  let fixture: ComponentFixture<AudioToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudioToggleComponent]
    });
    fixture = TestBed.createComponent(AudioToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
