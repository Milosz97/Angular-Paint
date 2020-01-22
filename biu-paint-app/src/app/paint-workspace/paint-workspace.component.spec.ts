import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintWorkspaceComponent } from './paint-workspace.component';

describe('PaintWorkspaceComponent', () => {
  let component: PaintWorkspaceComponent;
  let fixture: ComponentFixture<PaintWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
