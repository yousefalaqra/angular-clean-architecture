import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { IconsModule } from 'src/app/shared/icons/icons.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductApi } from '../../api/product.api';
import { ProductFacade } from '../../product.facade';
import { ProductState } from '../../state/product.state';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductDetailsComponent } from './product-details.component';
import {
  ActivatedRoute,
  convertToParamMap,
} from '@angular/router';
import { ProductResource } from '../../resources/product.resource';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { LoadingProductComponent } from '../../components/loading-product/loading-product.component';

let productDetailsComponent: ProductDetailsComponent;
let fixture: ComponentFixture<ProductDetailsComponent>;

let activatedRoute: ActivatedRoute;

describe('ProductsDetailsComponent', () => {
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
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
            },
          },
        },
      ],
      declarations: [
        ProductDetailsComponent,
        ProductItemComponent,
        LoadingProductComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    productDetailsComponent = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the product details component', () => {
    expect(productDetailsComponent).toBeTruthy();
  });

  it('should set product id to 1', (done) => {
    console.log('activatedRoute: ', activatedRoute);
    let value = activatedRoute.snapshot.paramMap.get('id');
    expect(value).toEqual('1');
    expect(productDetailsComponent.productID).toEqual(value as string);
    done();
  });

  it(`should have error message when is error is true`, (done) => {
    productDetailsComponent.isError = of(true);
    productDetailsComponent.isLoading = of(false);
    fixture.detectChanges();
    setTimeout(() => {
      const messageElement = fixture.nativeElement.querySelector('h3');
      expect(messageElement.textContent).toContain('Ops!');

      done();
    });
  });

  it(`should have loading icon 'When is loading is true loading indicator should be displayed'`, (done) => {
    productDetailsComponent.isLoading = of(true);
    fixture.detectChanges();

    setTimeout(() => {
      const loadingIcon =
        fixture.nativeElement.querySelector('loading-product');
      expect(loadingIcon).toBeTruthy();
      done();
    });
  });

  it(`should have product details item'`, (done) => {
    productDetailsComponent.isLoading = of(false);
    productDetailsComponent.isError = of(false);

    productDetailsComponent.product = of({
      image: '',
      name: '',
      price: 1,
      product_id: '1',
    } as ProductResource);

    fixture.detectChanges();

    setTimeout(() => {
      const loadingIcon = fixture.nativeElement.querySelector('product-item');
      expect(loadingIcon).toBeTruthy();
      done();
    });
  });
});
