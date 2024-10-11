import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { TOAST_STATE } from '../../shared/utils/constants/services-constants';

describe('ToastService', () => {
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    toastService = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(toastService).toBeTruthy();
  });

  test('should initialize with default values', () => {
    expect(toastService.showsToast$.getValue()).toBe(false);
    expect(toastService.toastMessage$.getValue()).toBe('');
    expect(toastService.toastState$.getValue()).toBe(TOAST_STATE.success);
  });

  test('showToast() should show toast with correct state and message', () => {
    const toastState = TOAST_STATE.error;
    const toastMsg = 'Error occurred';

    toastService.showToast(toastState, toastMsg);

    expect(toastService.toastState$.getValue()).toBe(toastState);
    expect(toastService.toastMessage$.getValue()).toBe(toastMsg);
    expect(toastService.showsToast$.getValue()).toBe(true);
  });

  test('showToast() should dismiss toast after specified duration', (done) => {
    const toastState = TOAST_STATE.success;
    const toastMsg = 'Operation successful';
    const duration = 100;

    toastService.showToast(toastState, toastMsg, duration);

    expect(toastService.showsToast$.getValue()).toBe(true);


    setTimeout(() => {
      expect(toastService.showsToast$.getValue()).toBe(false);
      done();
    }, duration + 10);
  });

  test('showToast() should dismiss toast immediately when dismissToast is called', () => {
    const toastState = TOAST_STATE.success;
    const toastMsg = 'Operation successful';

    toastService.showToast(toastState, toastMsg);
    expect(toastService.showsToast$.getValue()).toBe(true);

    toastService.dismissToast();
    expect(toastService.showsToast$.getValue()).toBe(false);
  });


});
