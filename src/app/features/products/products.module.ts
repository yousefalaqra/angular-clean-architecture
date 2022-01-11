import { NgModule } from '@angular/core';
import { IconsModule } from 'src/app/shared/icons/icons.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductApi } from './api/product.api';
import { FilterProductsComponent } from './components/filter-products/filter-products.component';
import { LoadingProductComponent } from './components/loading-product/loading-product.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductFacade } from './product.facade';
import { ProductRoutingModule } from './products.routing';
import { ProductState } from './state/product.state';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    FilterProductsComponent,
    LoadingProductComponent,
    ProductDetailsComponent
  ],
  providers: [ProductApi, ProductFacade, ProductState],
  imports: [ProductRoutingModule, SharedModule, IconsModule, ModalModule],
})
export class ProductModule {}
