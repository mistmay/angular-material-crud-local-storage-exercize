import { Injectable, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  @Output() somethingChanged: EventEmitter<void> = new EventEmitter();
  productList: Product[] = [];
  index: number = this.productList.length;
  constructor() { }
}
