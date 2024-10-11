import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService } from '../../../core/services/toast.service';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {

    const toastServiceMock = {
      dismissToast: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: ToastService, useValue: toastServiceMock },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dismissToast when dismiss is called', () => {
    component.dismiss();

    expect(toastService.dismissToast).toHaveBeenCalled();
  });
});
