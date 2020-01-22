import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSizeModalComponent } from './canvas-size-modal.component';

describe('CanvasSizeModalComponent', () => {
  let component: CanvasSizeModalComponent;
  let fixture: ComponentFixture<CanvasSizeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasSizeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasSizeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
