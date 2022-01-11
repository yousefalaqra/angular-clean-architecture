import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalContainerComponent } from './modal-container/modal-container.component';

@NgModule({
  declarations: [ModalContainerComponent],
  exports: [ModalContainerComponent],
  imports: [CommonModule]
})
export class ModalModule {}
