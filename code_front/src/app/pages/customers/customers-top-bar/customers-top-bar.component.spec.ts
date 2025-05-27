import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersTopBarComponent } from './customers-top-bar.component';

describe('CustomersTopBarComponent', () => {
  let component: CustomersTopBarComponent;
  let fixture: ComponentFixture<CustomersTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersTopBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
