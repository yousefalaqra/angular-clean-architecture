/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPopupComponent } from './product-popup.component';
import { ProductApi } from '../../api/product.api';
import { ProductFacade } from '../../product.facade';
import { ProductState } from '../../state/product.state';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductResource } from '../../resources/product.resource';

describe('ProductPopupComponent', () => {
  let component: ProductPopupComponent;
  let fixture: ComponentFixture<ProductPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ProductPopupComponent],

      providers: [ProductFacade, ProductState, ProductApi],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading', (done) => {
    component.isLoading = of(true);
    fixture.detectChanges();
    setTimeout(() => {
      const loadingElement =
        fixture.nativeElement.querySelector('loading-product');
      expect(loadingElement).toBeTruthy();
      done();
    });
  });

  it('should show loading', (done) => {
    component.isLoading = of(true);
    fixture.detectChanges();
    setTimeout(() => {
      const loadingElement =
        fixture.nativeElement.querySelector('loading-product');
      expect(loadingElement).toBeTruthy();
      done();
    });
  });

  it(`should show error`, (done) => {
    component.isError = of(true);
    component.isLoading = of(false);
    fixture.detectChanges();
    setTimeout(() => {
      const messageElement = fixture.nativeElement.querySelector('h3');
      expect(messageElement.textContent).toContain('Ops!');

      done();
    });
  });

  it(`should show product'`, (done) => {
    component.isLoading = of(false);
    component.isError = of(false);

    component.product = of({
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
