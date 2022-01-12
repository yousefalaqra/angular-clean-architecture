import { TestBed } from '@angular/core/testing';
import { combineLatest } from 'rxjs';
import { ProductResource } from '../resources/product.resource';
import { ProductState } from './product.state';

// Straight Jasmine testing without Angular's testing support
describe('ProductState', () => {
  let productState: ProductState;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ProductState] });

    productState = TestBed.inject(ProductState);
  });

  it('#getProducts should return products and isEmptyProductsList is false', (done) => {
    const testData: Array<ProductResource> = [
      { image: '', price: 2, name: 'Bananas', product_id: '1' },
      { image: '', price: 3, name: 'Apples', product_id: '2' },
      { image: '', price: 10, name: 'Pork', product_id: '3' },
    ];
    productState.setProducts(testData);

    combineLatest([
      productState.getProducts(),
      productState.getIsEmptyProductsList(),
    ]).subscribe({
      next: ([products, isEmpty]) => {
        expect(products).toEqual(testData);
        expect(isEmpty).toEqual(false);
        done();
      },
      error: done.fail,
    });
  });

  it('#getProductListError should return false', (done) => {
    const testData: boolean = false;
    productState.setProductListError(testData);

    productState.getProductsListError().subscribe({
      next: (status) => {
        expect(status).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#getProductListError should return true', (done) => {
    const testData: boolean = true;
    productState.setProductListError(testData);

    productState.getProductsListError().subscribe({
      next: (status) => {
        expect(status).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#getProductDetailsError should return false', (done) => {
    const testData: boolean = false;
    productState.setProductDetailsError(testData);

    productState.getProductDetailsError().subscribe({
      next: (status) => {
        expect(status).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#getProductDetailsError should return true', (done) => {
    const testData: boolean = true;
    productState.setProductDetailsError(testData);

    productState.getProductDetailsError().subscribe({
      next: (status) => {
        expect(status).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#getProductListLifeCycleEnded should return true', (done) => {
    const testData: boolean = true;
    
    productState.getProductListLifeCycleEnded().subscribe({
      next: (status: boolean) => {
        expect(status).toEqual(testData);
        done();
      },
      error: done.fail,
    });
    productState.setProductsListLifeCycleEnded();
  });

  it('#getProductDetailsLifeCycleEnded should return true', (done) => {
    const testData: boolean = true;
    
    productState.getProductDetailsLifeCycleEnded().subscribe({
      next: (status) => {
        expect(status).toEqual(testData);
        done();
      },
      error: done.fail,
    });
    productState.setProductDetailsLifeCycleEnded();
  });

  it('#filterProducts should return all products when filter key is not defined', (done) => {
    const testData: Array<ProductResource> = [
      { image: '', price: 2, name: 'Bananas', product_id: '1' },
      { image: '', price: 3, name: 'Apples', product_id: '2' },
      { image: '', price: 10, name: 'Pork', product_id: '3' },
    ];

    productState.setProducts(testData);
    productState.setFilteredProducts('');

    productState.getProducts().subscribe({
      next: (products) => {
        expect(products).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#filterProducts should return at least one product based on price filter', (done) => {
    const testData: Array<ProductResource> = [
      { image: '', price: 2, name: 'Bananas', product_id: '1' },
      { image: '', price: 3, name: 'Apples', product_id: '2' },
      { image: '', price: 10, name: 'Pork', product_id: '3' },
    ];

    productState.setProducts(testData);
    productState.setFilteredProducts('10');

    productState.getProducts().subscribe({
      next: (products) => {
        expect(products).toEqual([
          { image: '', price: 10, name: 'Pork', product_id: '3' },
        ]);
        done();
      },
      error: done.fail,
    });
  });

  it('#filterProducts should return at least one product based on name filter', (done) => {
    const testData: Array<ProductResource> = [
      { image: '', price: 2, name: 'Bananas', product_id: '1' },
      { image: '', price: 3, name: 'Apples', product_id: '2' },
      { image: '', price: 10, name: 'Pork', product_id: '3' },
    ];

    productState.setProducts(testData);
    productState.setFilteredProducts('Bananas');

    productState.getProducts().subscribe({
      next: (products) => {
        expect(products).toEqual([
          { image: '', price: 2, name: 'Bananas', product_id: '1' },
        ]);
        done();
      },
      error: done.fail,
    });
  });

  it('#filterProducts should return at empty result when no match is found', (done) => {
    const testData: Array<ProductResource> = [
      { image: '', price: 2, name: 'Bananas', product_id: '1' },
      { image: '', price: 3, name: 'Apples', product_id: '2' },
      { image: '', price: 10, name: 'Pork', product_id: '3' },
    ];

    productState.setProducts(testData);
    productState.setFilteredProducts('z');

    productState.getProducts().subscribe({
      next: (products) => {
        expect(products).toEqual([]);
        done();
      },
      error: done.fail,
    });
  });

  it('#filterProducts should return at products that contains at least one letter of search key', (done) => {
    const testData: Array<ProductResource> = [
      { image: '', price: 2, name: 'Bananas', product_id: '1' },
      { image: '', price: 3, name: 'Apples', product_id: '2' },
      { image: '', price: 10, name: 'Pork', product_id: '3' },
    ];

    productState.setProducts(testData);
    productState.setFilteredProducts('p');

    productState.getProducts().subscribe({
      next: (products) => {
        expect(products).toEqual([
          { image: '', price: 3, name: 'Apples', product_id: '2' },
          { image: '', price: 10, name: 'Pork', product_id: '3' },
        ]);
        done();
      },
      error: done.fail,
    });
  });

  it('#filterProducts should return filtered list products after not found search result', (done) => {
    const testData: Array<ProductResource> = [
      { image: '', price: 2, name: 'Bananas', product_id: '1' },
      { image: '', price: 3, name: 'Apples', product_id: '2' },
      { image: '', price: 10, name: 'Pork', product_id: '3' },
    ];

    productState.setProducts(testData);
    productState.setFilteredProducts('z');
    productState.setFilteredProducts('Bananas');

    productState.getProducts().subscribe({
      next: (products) => {
        console.log('test: ', products);
        expect(products).toEqual([
          { image: '', price: 2, name: 'Bananas', product_id: '1' },
        ]);
        done();
      },
      error: done.fail,
    });
  });

  it('#filterProducts should return original list products after not found search result', (done) => {
    const testData: Array<ProductResource> = [
      { image: '', price: 2, name: 'Bananas', product_id: '1' },
      { image: '', price: 3, name: 'Apples', product_id: '2' },
      { image: '', price: 10, name: 'Pork', product_id: '3' },
    ];

    productState.setProducts(testData);
    productState.setFilteredProducts('z');
    productState.setFilteredProducts('');

    productState.getProducts().subscribe({
      next: (products) => {
        console.log('test: ', products);
        expect(products).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#getSelectedProduct should return product', (done) => {
    const testData: ProductResource = {
      image: '',
      price: 2,
      name: 'Bananas',
      product_id: '1',
    };
    productState.setSelectedProduct(testData);

    productState.getSelectedProduct().subscribe({
      next: (product) => {
        expect(product).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#getIsLoadingProductsList should be true', (done) => {
    const testData = true;
    productState.setIsLoadingProductsList(testData);

    productState.getIsLoadingProductsList().subscribe({
      next: (status: boolean) => {
        expect(status).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#getIsLoadingProductsList should be false', (done) => {
    const testData = false;
    productState.setIsLoadingProductsList(testData);

    productState.getIsLoadingProductsList().subscribe({
      next: (status: boolean) => {
        expect(status).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#getIsLoadingProductDetails should be true', (done) => {
    const testData = true;
    productState.setIsLoadingProductDetails(testData);

    productState.getIsLoadingProductDetails().subscribe({
      next: (status: boolean) => {
        expect(status).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#getIsLoadingProductDetails should be false', (done) => {
    const testData = false;
    productState.setIsLoadingProductDetails(testData);

    productState.getIsLoadingProductDetails().subscribe({
      next: (status: boolean) => {
        expect(status).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });

  it('#showProductDetailsScreen should be productID', (done) => {
    const testProductID: string = '1';
    const mobileScreenWidth = 500;

    productState.getShowProductDetailsScreen().subscribe({
      next: (productID: string) => {
        expect(productID).toEqual(testProductID);
        done();
      },
      error: done.fail,
    });
    productState.requestProductDetailsScreen(testProductID, mobileScreenWidth);
  });

  it('#getShowProductDetailsModal should be true', (done) => {
    const testProductID: string = '1';
    const desktopScreenWidth = 1200;
    productState.getShowProductDetailsModal().subscribe({
      next: (status: boolean) => {
        expect(status).toEqual(true);
        done();
      },
      error: done.fail,
    });
    productState.requestProductDetailsScreen(testProductID, desktopScreenWidth);
  });

  it('#closeProductDetailsModal selectedId should be empty', (done) => {
    productState.closeProductDetailsModal();
    productState.getSelectedProductID().subscribe({
      next: (id) => {
        expect(id).toEqual('');
        done();
      },
      error: done.fail,
    });
  });
});
