import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndgameScreenComponent } from './endgame-screen.component';

describe('EndgameScreenComponent', () => {
  let component: EndgameScreenComponent;
  let fixture: ComponentFixture<EndgameScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndgameScreenComponent]
    });
    fixture = TestBed.createComponent(EndgameScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
