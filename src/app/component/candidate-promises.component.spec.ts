import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePromisesComponent } from './candidate-promises.component';

describe('CandidatePromisesComponent', () => {
  let component: CandidatePromisesComponent;
  let fixture: ComponentFixture<CandidatePromisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatePromisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatePromisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
