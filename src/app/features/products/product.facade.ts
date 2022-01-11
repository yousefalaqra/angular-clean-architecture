import { Injectable } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
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

  getIsLoadingProductsList(): Observable<boolean> {
    return this._productState.getIsLoadingProductsList();
  }

  getSelectedProduct(): Observable<ProductResource> {
    return this._productState.getSelectedProduct();
  }

  getIsLoadingProductDetails(): Observable<boolean> {
    return this._productState.getIsLoadingProductDetails();
  }

  getProductsListError(): Observable<boolean>{
    return this._productState.getProductsListError();
  }

  getIsEmptyProductsList(): Observable<boolean>{
    return this._productState.getIsEmptyProductsList()
  }

  getProductDetailsError(): Observable<boolean>{
    return this._productState.getProductDetailsError();
  }

  getProductDetailsEndOfCycle(): Observable<boolean>{
    return this._productState.getProductDetailsLifeCycleEnded()
  }

  getProductsListEndOfCycle(): Observable<boolean>{
    return this._productState.getProductListLifeCycleEnded()
  }

  getShowProductDetailsModal(): Observable<{show: boolean, productID: string}>{
    return this._productState.getShowProductDetailsModal()
  }

  getShowProductDetailsScreen(): Observable<string>{
    return this._productState.getShowProductDetailsScreen()
  }

  loadProducts(): void {
    this._productState.setIsLoadingProductsList(true);

    this._productApi
      .loadProducts()
      .pipe(takeUntil(this._productState.getProductListLifeCycleEnded()))
      .subscribe({
        next: (response:  {products: Array<ProductResource> }) => {
          this._productState.setProducts(response.products);
          this._productState.setIsLoadingProductsList(false);
        },
        error: (error: any) => {
          this._productState.setProductListError(true);
          this._productState.setIsLoadingProductsList(false);
        },
      });
  }

  loadProductDetails(productID: string): void {
    this._productState.setIsLoadingProductDetails(true);

    this._productApi
      .loadProductDetails(productID)
      .pipe(takeUntil(this._productState.getProductListLifeCycleEnded()))
      .subscribe({
        next: (product: ProductResource) => {
          this._productState.setSelectedProduct(product);
          this._productState.setIsLoadingProductDetails(false);
        },
        error: (error: any) => {
          this._productState.setProductDetailsError(true);
          this._productState.setIsLoadingProductDetails(false);
        },
      });
  }

  setProductsListEndOfCycle(): void{
    this._productState.setProductsListLifeCycleEnded()
  }

  setProductDetailsEndOfCycle(): void{
    this._productState.setProductDetailsLifeCycleEnded()
  }

  filterProducts(key: string): void {
    this._productState.setFilteredProducts(key);
  }

  requestProductDetailsScreen(productID: string, screenWidth: number){
    this._productState.requestProductDetailsScreen(productID, screenWidth)
  }
}
