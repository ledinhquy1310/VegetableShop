import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdComponent } from './add-prod.component';

describe('AddProdComponent', () => {
  let component: AddProdComponent;
  let fixture: ComponentFixture<AddProdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProdComponent]
    });
    fixture = TestBed.createComponent(AddProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
