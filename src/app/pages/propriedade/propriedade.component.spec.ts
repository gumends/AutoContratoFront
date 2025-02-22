import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropriedadeComponent } from './propriedade.component';

describe('PropriedadeComponent', () => {
  let component: PropriedadeComponent;
  let fixture: ComponentFixture<PropriedadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropriedadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropriedadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
