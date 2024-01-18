import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditUnitComponent } from './view-edit-unit.component';

describe('ViewEditUnitComponent', () => {
  let component: ViewEditUnitComponent;
  let fixture: ComponentFixture<ViewEditUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEditUnitComponent]
    });
    fixture = TestBed.createComponent(ViewEditUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
