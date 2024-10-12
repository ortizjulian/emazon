import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowByComponent } from './show-by.component';

describe('ShowByComponent', () => {
  let component: ShowByComponent;
  let fixture: ComponentFixture<ShowByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowByComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
