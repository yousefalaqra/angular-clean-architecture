import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-product',
  templateUrl: './loading-product.component.html',
  styleUrls: ['./loading-product.component.scss'],
})
export class LoadingProductComponent implements OnInit {
  @Input() size: 'small' | 'normal' = 'normal';
  constructor() {}

  ngOnInit() {}
}
