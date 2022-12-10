import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndgameDialogComponent } from './endgame-dialog.component';

describe('EndgameDialogComponent', () => {
  let component: EndgameDialogComponent;
  let fixture: ComponentFixture<EndgameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndgameDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EndgameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
