import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProductResource } from '../resources/product.resource';

@Injectable()
export class ProductState {
  private products = new BehaviorSubject<Array<ProductResource>>([]);
  private productsCopy: Array<ProductResource> = [];
  private isLoadingProductsList = new BehaviorSubject<boolean>(false);
  private productsListError = new BehaviorSubject<boolean>(false);
  private isEmptyProductsList = new BehaviorSubject<boolean>(false);
  private selectedProduct = new BehaviorSubject<ProductResource>(
    {} as ProductResource
  );
  private isLoadingProductDetails = new BehaviorSubject<boolean>(false);
  private productDetailsError = new BehaviorSubject<boolean>(false);
  private productsListLifeCycleEnded = new Subject<boolean>();
  private productDetailsLifeCycleEnded = new Subject<boolean>();
  private showProductDetailsModal = new Subject<{
    show: boolean;
    productID: string;
  }>();
  private showProductDetailsScreen = new Subject<string>();

  getProducts(): Observable<Array<ProductResource>> {
    return this.products.asObservable();
  }

  getIsLoadingProductsList(): Observable<boolean> {
    return this.isLoadingProductsList.asObservable();
  }

  getSelectedProduct(): Observable<ProductResource> {
    return this.selectedProduct.asObservable();
  }

  getIsLoadingProductDetails(): Observable<boolean> {
    return this.isLoadingProductDetails.asObservable();
  }

  getProductListLifeCycleEnded(): Observable<boolean> {
    return this.productsListLifeCycleEnded.asObservable();
  }

  getProductDetailsLifeCycleEnded(): Observable<boolean> {
    return this.productDetailsLifeCycleEnded.asObservable();
  }

  getProductDetailsError(): Observable<boolean> {
    return this.productDetailsError.asObservable();
  }

  getProductsListError(): Observable<boolean> {
    return this.productsListError.asObservable();
  }

  getIsEmptyProductsList(): Observable<boolean> {
    return this.isEmptyProductsList.asObservable();
  }

  getShowProductDetailsModal(): Observable<{
    show: boolean;
    productID: string;
  }> {
    return this.showProductDetailsModal.asObservable();
  }

  getShowProductDetailsScreen(): Observable<string> {
    return this.showProductDetailsScreen.asObservable();
  }

  setProducts(products: Array<ProductResource>): void {
    if (products.length == 0) this.isEmptyProductsList.next(true);
    this.productsCopy = [...products];
    this.products.next(this.productsCopy);
  }

  setIsLoadingProductsList(status: boolean): void {
    this.isLoadingProductsList.next(status);
  }

  setSelectedProduct(product: ProductResource): void {
    this.selectedProduct.next(product);
  }

  setIsLoadingProductDetails(status: boolean): void {
    this.isLoadingProductDetails.next(status);
  }

  setFilteredProducts(key: string): void {
    if (!key) {
      this.products.next(this.productsCopy);
      return;
    }
    const productsFilterList = [...this.productsCopy];

    const filteredProducts = productsFilterList.filter(
      (x) => x.name.includes(key) || x.price == Number(key)
    );

    this.products.next(filteredProducts);
  }

  setProductListError(status: boolean): void {
    this.productsListError.next(status);
  }

  setProductDetailsError(status: boolean): void {
    this.productDetailsError.next(status);
  }

  setProductsListLifeCycleEnded(): void {
    this.productsListLifeCycleEnded.next(true);
  }

  setProductDetailsLifeCycleEnded(): void {
    this.productDetailsLifeCycleEnded.next(true);
  }

  requestProductDetailsScreen(productID: string, screenWidth: number): void {
    // NOTE: should we display modal or screen for tablet devices?
    if (screenWidth >= 768) {
      // tablet and more
      this.showProductDetailsModal.next({ show: true, productID: productID });
    } else {
      // phone devices
      this.showProductDetailsScreen.next(productID);
    }
  }
}
