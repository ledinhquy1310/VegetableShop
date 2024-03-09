import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDbComponent } from './products-db.component';

describe('ProductsDbComponent', () => {
  let component: ProductsDbComponent;
  let fixture: ComponentFixture<ProductsDbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsDbComponent]
    });
    fixture = TestBed.createComponent(ProductsDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
