import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { IconsModule } from 'src/app/shared/icons/icons.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductApi } from '../../api/product.api';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { ProductFacade } from '../../product.facade';
import { ProductResource } from '../../resources/product.resource';
import { ProductState } from '../../state/product.state';
import { ProductPopupComponent } from '../product-popup/product-popup.component';
import { ProductListComponent } from './product-list.component';
import { RouterTestingModule } from '@angular/router/testing';

let productsListComponent: ProductListComponent;
let fixture: ComponentFixture<ProductListComponent>;
const route = { data: of({ label: 'hello' }) } as any as ActivatedRoute;

describe('ProductsListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SharedModule,
        IconsModule,
        RouterTestingModule,
      ],
      providers: [
        ProductFacade,
        ProductState,
        ProductApi,
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
      declarations: [
        ProductListComponent,
        ProductItemComponent,
        ProductPopupComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    productsListComponent = fixture.componentInstance;
  });

  it('should create the products list component', () => {
    expect(productsListComponent).toBeTruthy();
  });

  it(`should have error message when is error is true`, (done) => {
    productsListComponent.isError = of(true);
    productsListComponent.isLoading = of(false);
    productsListComponent.isEmpty = of(false);
    fixture.detectChanges();
    setTimeout(() => {
      const messageElement = fixture.nativeElement.querySelector('h3');
      expect(messageElement.textContent).toContain('Ops!!');

      done();
    });
  });

  it(`should have empty list message when isEmpty is true`, (done) => {
    productsListComponent.isEmpty = of(true);
    productsListComponent.isError = of(false);
    productsListComponent.isLoading = of(false);
    fixture.detectChanges();

    setTimeout(() => {
      const messageElement = fixture.nativeElement.querySelector('h3');
      expect(messageElement.textContent).toContain('Are you hungry');
      done();
    });
  });

  it(`should have loading icon 'When is loading is true loading indicator should be displayed'`, (done) => {
    productsListComponent.isLoading = of(true);
    fixture.detectChanges();

    setTimeout(() => {
      const loadingIcon =
        fixture.nativeElement.querySelector('loading-product');
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
      expect(productItem).toBeTruthy();
      done();
    });
  });

  it(`should have product details modal when showProductDetailsModal status is true`, (done) => {
    productsListComponent.showProductDetailsModal = of(true);
    fixture.detectChanges();
    setTimeout(() => {
      const productItem = fixture.nativeElement.querySelector('modal');
      expect(productItem).toBeTruthy();
      done();
    });
  });
});
