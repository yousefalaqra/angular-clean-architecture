import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductHomeComponent } from './containers/products-home/products-home.component';

const routes: Routes = [
  {
    path: '',
    component: ProductHomeComponent,
    children: [
      { path: ':id', component: ProductDetailsComponent },
      { path: '', component: ProductListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
