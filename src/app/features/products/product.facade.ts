import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApi } from './api/product.api';
import { ProductResource } from './resources/product.resource';
import { ProductState } from './state/product.state';

@Injectable()
export class ProductFacade {
  constructor(
    private _productState: ProductState,
    private _productApi: ProductApi
  ) {}

  getProducts(): Observable<Array<ProductResource>> {
    return this._productState.getProducts();
  }

  getIsLoading(): Observable<boolean> {
    return this._productState.getIsLoading();
  }

  loadProducts(): void {
    this._productState.setIsLoading(true);

    this._productApi
      .loadProducts()
      .subscribe((products: Array<ProductResource>) => {
        this._productState.setProducts(products);
        this._productState.setIsLoading(false);
      });
  }

  filterProducts(key: string | number): void {
    this._productState.filterProducts(key);
  }
}
