import { TestBed } from '@angular/core/testing';
import { ProductApi } from './product.api';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductResource } from '../resources/product.resource';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, defer, of } from 'rxjs';

export function asyncData<T>(data: T) {
  return new BehaviorSubject<T>(data).asObservable();
}

describe('ProductApi', () => {
  let productApi: ProductApi;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductApi],
    });

    // Inject the http service and test controller for each test
    productApi = TestBed.inject(ProductApi);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('#loadProducts should return expected products', (done) => {
    const testProductsData: { products: Array<ProductResource> } = {
      products: [
        { image: '', price: 2, name: 'Bananas', product_id: '1' },
        { image: '', price: 3, name: 'Apples', product_id: '2' },
        { image: '', price: 10, name: 'Pork', product_id: '3' },
      ],
    };

    productApi.loadProducts().subscribe({
      next: (products) => {
        expect(products).toEqual(testProductsData);
        done();
      },
      error: done.fail,
    });
    const req = httpTestingController.expectOne(
      'https://s3-eu-west-1.amazonaws.com/developer-application-test/cart/list'
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testProductsData);

    httpTestingController.verify();
  });

  it('#loadProductDetails should return expected product', (done) => {
    const testProductID: string = '1';
    const tstProductData: ProductResource = {
      image: '',
      price: 2,
      name: 'Bananas',
      product_id: '1',
    };

    productApi.loadProductDetails(testProductID).subscribe({
      next: (product) => {
        expect(product.product_id).toEqual(testProductID);
        expect(product).toEqual(tstProductData);
        done();
      },
      error: done.fail,
    });

    const req = httpTestingController.expectOne(
      `https://s3-eu-west-1.amazonaws.com/developer-application-test/cart/${testProductID}/detail`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(tstProductData);

    httpTestingController.verify();
  });

  it('#loadProductDetails should return `400 Bad Request` error response with invalid productID', (done) => {
    const testProductID: string = '233';
    let headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      Accept: 'text/xml',
      'Response-Type': 'text',
    });

    const mockError = new HttpErrorResponse({
      headers: headers,
      status: 400,
      statusText: 'Bad Request',
    });

    productApi.loadProductDetails(testProductID).subscribe({
      next: () => {
        done.fail();
      },
      error: (err) => {
        expect(err.status).toEqual(mockError.status);
        done();
      },
    });

    const req = httpTestingController.expectOne(
      `https://s3-eu-west-1.amazonaws.com/developer-application-test/cart/${testProductID}/detail`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockError, { status: 400, statusText: 'Bad Request' });

    httpTestingController.verify();
  });
});
