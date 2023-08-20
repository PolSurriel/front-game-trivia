import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectorComponent } from './multi-selector.component';

describe('MultiSelectorComponent', () => {
  let component: MultiSelectorComponent;
  let fixture: ComponentFixture<MultiSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectorComponent]
    });
    fixture = TestBed.createComponent(MultiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
