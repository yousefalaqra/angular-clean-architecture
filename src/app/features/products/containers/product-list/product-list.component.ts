import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { ProductFacade } from '../../product.facade';
import { ProductResource } from '../../resources/product.resource';

@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Observable<Array<ProductResource>>;
  isLoading: Observable<boolean>;
  isError: Observable<boolean>;
  isEmpty: Observable<boolean>;
  showProductDetailsModal: Observable<{ show: boolean; productID: string }>;
  showProductDetailsScreen: Observable<string>;

  constructor(private _productFacade: ProductFacade, private _router: Router, private _route: ActivatedRoute) {
    this.products = this._productFacade.getProducts();
    this.isLoading = this._productFacade.getIsLoadingProductsList();
    this.isError = this._productFacade.getProductsListError();
    this.isEmpty = this._productFacade.getIsEmptyProductsList();
    this.showProductDetailsModal =
      this._productFacade.getShowProductDetailsModal();
      this.showProductDetailsScreen = this._productFacade.getShowProductDetailsScreen()
  }

  ngOnInit(): void {
    this._productFacade.loadProducts();

    this.showProductDetailsScreen
      .pipe(takeUntil(this._productFacade.getProductsListEndOfCycle()))
      .subscribe({
        next: (productID: string) => {
          this.navigateToProductDetails(productID)
        },
      });
  }

  onFilterList(key: string) {
    this._productFacade.filterProducts(key);
  }

  onProductClick(productID: string): void {
    this._productFacade.requestProductDetailsScreen(
      productID,
      window.innerWidth
    );
  }

  navigateToProductDetails(productID: string): void {
    this._router.navigate(['../', productID], {relativeTo:  this._route});
  }

  ngOnDestroy(): void {
    this._productFacade.setProductsListEndOfCycle();
  }
}
