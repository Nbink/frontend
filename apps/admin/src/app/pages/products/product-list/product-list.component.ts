import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@nick/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {
  products = [];
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts(){
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  updateProduct(productId: string){
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Confirm delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
          },
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted'
            });
          }
        );
      },
    }); 
  }

}
