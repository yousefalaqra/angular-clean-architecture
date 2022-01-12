import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, takeUntil, takeWhile } from 'rxjs';
import { ProductFacade } from '../../product.facade';
import { ProductResource } from '../../resources/product.resource';

@Component({
  selector: 'product-popup',
  templateUrl: './product-popup.component.html',
})
export class ProductPopup implements OnInit, OnDestroy {
  @Input() productID!: string;

  product: Observable<ProductResource>;
  isError: Observable<boolean>;
  isLoading: Observable<boolean>;

  constructor(private _productFacade: ProductFacade) {
    this.product = this._productFacade.getSelectedProduct();
    this.isError = this._productFacade.getProductDetailsError();
    this.isLoading = this._productFacade.getIsLoadingProductDetails();
  }

  ngOnInit(): void {
    this._productFacade
      .getSelectedProductID()
      .pipe(takeWhile((x) => x != ''))
      .subscribe({
        next: (id: string) => {
          this._productFacade.loadProductDetails(id);
        },
      });
  }

  loadProduct(id: string): void {
    this._productFacade.loadProductDetails(id);
  }

  ngOnDestroy(): void {
    this._productFacade.setProductDetailsEndOfCycle();
  }
}
