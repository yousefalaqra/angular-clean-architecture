import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { ProductResource } from '../resources/product.resource';

@Injectable()
export class ProductApi {
  private readonly API = `${environment.apiBaseBath}/developer-application-test/cart`;

  constructor(private _http: HttpClient) {}

  loadProducts(): Observable<Array<ProductResource>> {
    return this._http
      .get<{ products: Array<ProductResource> }>(`${this.API}/list`)
      .pipe(map((res: { products: Array<ProductResource> }) => res.products));
  }
}
