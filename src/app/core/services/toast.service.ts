import { Injectable } from '@angular/core';

export const TOAST_STATE = {
  success: 'success-toast',
  error: 'error-toast'
};

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  constructor() { }
}