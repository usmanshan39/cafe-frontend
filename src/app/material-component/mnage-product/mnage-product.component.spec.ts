import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnageProductComponent } from './mnage-product.component';

describe('MnageProductComponent', () => {
  let component: MnageProductComponent;
  let fixture: ComponentFixture<MnageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnageProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MnageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
