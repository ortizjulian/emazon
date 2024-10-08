import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { ToastService } from 'src/app/core/services/toast.service';
import { ICONS } from 'src/app/shared/utils/enums/icons-enums';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateY(0%)' })),
      state('close', style({ transform: 'translateY(-200%)' })),
      transition('open <=> close', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})

export class ToastComponent implements OnInit {

  toastMessage: string = "";
  showsToast: boolean = false;
  icons = ICONS;
  constructor(public toast: ToastService) { }

  ngOnInit(): void { }

  dismiss(): void {
    this.toast.dismissToast();
  }
}
