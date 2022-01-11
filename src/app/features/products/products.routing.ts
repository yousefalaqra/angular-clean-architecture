import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './containers/product-details/product-details.component';
import { ProductListComponent } from './containers/product-list/product-list.component';

const routes: Routes = [
  { path: 'list', component: ProductListComponent },
  { path: ':id', component: ProductDetailsComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
