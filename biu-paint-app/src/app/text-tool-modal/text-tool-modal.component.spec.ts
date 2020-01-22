import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToolModalComponent } from './text-tool-modal.component';

describe('TextToolModalComponent', () => {
  let component: TextToolModalComponent;
  let fixture: ComponentFixture<TextToolModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextToolModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextToolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
