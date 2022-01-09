import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFacade } from '../../product.facade';
import { ProductResource } from '../../resources/product.resource';

@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Observable<Array<ProductResource>>;
  isLoading: Observable<boolean>;

  constructor(private _productFacade: ProductFacade) {
    this.products = this._productFacade.getProducts();
    this.isLoading = this._productFacade.getIsLoading();
  }

  ngOnInit(): void {
    this._productFacade.loadProducts();
  }

  onFilterList(key: string | number) {
    this._productFacade.filterProducts(key);
  }
}
