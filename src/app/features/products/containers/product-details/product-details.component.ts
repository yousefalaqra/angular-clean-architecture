import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, takeUntil } from 'rxjs';
import { ProductFacade } from '../../product.facade';
import { ProductResource } from '../../resources/product.resource';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  @Input() productID!: string;

  product: Observable<ProductResource>;
  isError: Observable<boolean>;
  isLoading: Observable<boolean>;
  constructor(
    private _productFacade: ProductFacade,
    private _route: ActivatedRoute
  ) {
    this.product = this._productFacade.getSelectedProduct();
    this.isError = this._productFacade.getProductDetailsError();
    this.isLoading = this._productFacade.getIsLoadingProductDetails();
  }

  ngOnInit(): void {
    this._route.paramMap
      .pipe(takeUntil(this._productFacade.getProductDetailsEndOfCycle()))
      .subscribe({
        next: (params) => {
          this.loadProduct(
            params.get('id') == null
              ? this.productID
              : (params.get('id') as string)
          );
        },
      });
  }

  loadProduct(id: string): void {
    this._productFacade.loadProductDetails(id);
  }

  ngOnDestroy(): void {
    this._productFacade.setProductDetailsEndOfCycle()
  }
}
