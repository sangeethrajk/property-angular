import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApplicationComponent } from './pending-application.component';

describe('PendingApplicationComponent', () => {
  let component: PendingApplicationComponent;
  let fixture: ComponentFixture<PendingApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingApplicationComponent]
    });
    fixture = TestBed.createComponent(PendingApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
