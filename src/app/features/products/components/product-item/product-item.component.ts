import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductResource } from '../../resources/product.resource';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: ProductResource;
  @Output() onProduct = new EventEmitter<string>();

  onProductClick(): void {
    this.onProduct.emit(this.product.product_id);
  }
}
