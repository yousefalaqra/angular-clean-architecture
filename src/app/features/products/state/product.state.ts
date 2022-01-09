import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductResource } from '../resources/product.resource';

@Injectable()
export class ProductState {
  private products = new BehaviorSubject<Array<ProductResource>>([]);
  private productsCopy: Array<ProductResource> = [];
  private isLoading = new BehaviorSubject<boolean>(false);

  getProducts(): Observable<Array<ProductResource>> {
    return this.products.asObservable();
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setProducts(products: Array<ProductResource>): void {
    this.productsCopy = [...products];
    this.products.next(this.productsCopy);
  }

  setIsLoading(status: boolean): void {
    this.isLoading.next(status);
  }

  filterProducts(key: string | number): void {
    if (!key) {
      this.products.next(this.productsCopy);
      return;
    }
    const currentProducts = this.products.getValue();
    const filteredProducts = currentProducts.filter(
      (x) => x.name == key || x.price == key
    );
    
    this.products.next(filteredProducts);
  }
}
