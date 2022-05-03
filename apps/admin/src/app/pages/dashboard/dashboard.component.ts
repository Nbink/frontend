import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@nick/products';
import { UsersService } from '@nick/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  statistics = [];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}