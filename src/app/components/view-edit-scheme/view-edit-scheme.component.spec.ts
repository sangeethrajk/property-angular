import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditSchemeComponent } from './view-edit-scheme.component';

describe('ViewEditSchemeComponent', () => {
  let component: ViewEditSchemeComponent;
  let fixture: ComponentFixture<ViewEditSchemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEditSchemeComponent]
    });
    fixture = TestBed.createComponent(ViewEditSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
