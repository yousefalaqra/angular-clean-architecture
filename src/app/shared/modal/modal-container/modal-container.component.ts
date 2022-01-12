import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onCloseClick(): void {
    this.onClose.emit();
  }
}
