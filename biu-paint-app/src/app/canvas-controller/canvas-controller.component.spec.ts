import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasControllerComponent } from './canvas-controller.component';

describe('CanvasControllerComponent', () => {
  let component: CanvasControllerComponent;
  let fixture: ComponentFixture<CanvasControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
