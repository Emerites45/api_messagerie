import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoyerCommandeComponent } from './envoyer-commande.component';

describe('EnvoyerCommandeComponent', () => {
  let component: EnvoyerCommandeComponent;
  let fixture: ComponentFixture<EnvoyerCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvoyerCommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnvoyerCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
