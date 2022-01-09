import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss'],
})
export class FilterProductsComponent {
  @Output() onFilterKeyChange = new EventEmitter<string>();

  onFilterInputValueChange(key: string): void {
    this.onFilterKeyChange.emit(key);
  }
}
