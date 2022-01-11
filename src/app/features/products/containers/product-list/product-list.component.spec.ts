import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconsModule } from 'src/styles/icons/icons.module';
import { ProductApi } from '../../api/product.api';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { ProductFacade } from '../../product.facade';
import { ProductResource } from '../../resources/product.resource';
import { ProductState } from '../../state/product.state';
import { ProductListComponent } from './product-list.component';

let productsListComponent: ProductListComponent;
let fixture: ComponentFixture<ProductListComponent>;

describe('ProductsListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedModule, IconsModule],
      providers: [ProductFacade, ProductState, ProductApi,  { provide: ComponentFixtureAutoDetect, useValue: true}],
      declarations: [ProductListComponent, ProductItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    productsListComponent = fixture.componentInstance;
  });

  it('should create the products list component', () => {
    expect(productsListComponent).toBeTruthy();
  });

  it(`should have error message 'Ops! something went wrong while filling your store!'`, (done) => {
    productsListComponent.isError = of(true);
    productsListComponent.isLoading = of(false);
    productsListComponent.isEmpty = of(false);
    fixture.detectChanges();
    setTimeout(() => {
      const messageElement = fixture.nativeElement.querySelector('h3');
      expect(messageElement.textContent).toEqual(
        'Ops! something went wrong while filling your store!'
      );

      done();
    });
  });

  it(`should have empty list message 'Ops! no products were found!'`, (done) => {
    productsListComponent.isEmpty = of(true);
    productsListComponent.isError = of(false);
    productsListComponent.isLoading = of(false);
    fixture.detectChanges();

    setTimeout(() => {
      const messageElement = fixture.nativeElement.querySelector('h3');
      expect(messageElement.textContent).toEqual(
        'Ops! no products were found!'
      );
      done();
    });
  });

  it(`should have loading icon 'When is loading is true loading indicator should be displayed'`, (done) => {
    productsListComponent.isLoading = of(true);
    fixture.detectChanges();

    setTimeout(() => {
      const loadingIcon = fixture.nativeElement.querySelector('loading-apple');
      expect(loadingIcon).toBeTruthy();
      done();
    });
  });

  it(`should have at least one product item`, (done) => {
    productsListComponent.products = of([
      {
        product_id: '1',
        image: '',
        name: 'test1',
        price: 123,
      } as ProductResource,
    ]);
    productsListComponent.isLoading = of(false);
    productsListComponent.isError = of(false);
    productsListComponent.isEmpty = of(false);
    fixture.detectChanges();
    setTimeout(() => {
      const productItem = fixture.nativeElement.querySelector('product-item');
      expect(productItem).toBeTruthy()
      done();
    });
  });
});
