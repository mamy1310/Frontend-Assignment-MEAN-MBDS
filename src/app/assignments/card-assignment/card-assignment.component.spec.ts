import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAssignmentComponent } from './card-assignment.component';

describe('CardAssignmentComponent', () => {
  let component: CardAssignmentComponent;
  let fixture: ComponentFixture<CardAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
