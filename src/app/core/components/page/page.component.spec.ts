import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../core.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageComponent],
      imports: [CoreModule, BrowserAnimationsModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
