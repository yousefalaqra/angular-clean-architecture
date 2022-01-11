import { TestBed } from '@angular/core/testing';
import { ProductResource } from '../resources/product.resource';
import { ProductState } from './product.state';

// Straight Jasmine testing without Angular's testing support
describe('ProductState', () => {
  let productState: ProductState;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ProductState] });

    productState = TestBed.inject(ProductState);
  });

  it('#getProducts should return products', (done) => {
    const testData: Array<ProductResource> = [
      { image: '', price: 2, name: 'Bananas', product_id: '1' },
      { image: '', price: 3, name: 'Apples', product_id: '2' },
      { image: '', price: 10, name: 'Pork', product_id: '3' },
    ];
    productState.setProducts(testData);

    productState.getProducts().subscribe({
      next: (products) => {
        expect(products).toEqual(testData);
        done();
      },
      error: done.fail,
    });
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
    productState.setFilteredProducts(10);

    productState.getProducts().subscribe({
      next: (products) => {
        expect(products).toEqual([{ image: '', price: 10, name: 'Pork', product_id: '3' }]);
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
        expect(products).toEqual([{ image: '', price: 2, name: 'Bananas', product_id: '1' }]);
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
        expect(products).toEqual([{ image: '', price: 2, name: 'Bananas', product_id: '1' }]);
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
    const testData: ProductResource = 
      { image: '', price: 2, name: 'Bananas', product_id: '1' };
    productState.setSelectedProduct(testData);

    productState.getSelectedProduct().subscribe({
      next: (product) => {
        expect(product).toEqual(testData);
        done();
      },
      error: done.fail,
    });
  });
});
