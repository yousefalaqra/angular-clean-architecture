import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { ProductFacade } from '../../product.facade';
import { ProductResource } from '../../resources/product.resource';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productID: string = '';
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
    this.productID = this._route.snapshot.paramMap.get('id') as string;
    this.loadProduct(this.productID);
  }

  loadProduct(id: string): void {
    this._productFacade.loadProductDetails(id);
  }

  ngOnDestroy(): void {
    this._productFacade.setProductDetailsEndOfCycle();
  }
}
