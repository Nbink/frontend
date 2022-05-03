import { Component, OnInit } from '@angular/core';
import { CategoriesService, ProductCategory } from '@nick/products';
import { MessageService} from 'primeng/api';
import { timer, lastValueFrom, firstValueFrom } from 'rxjs';
import {ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'admin-category-list',
  templateUrl: './category-list.component.html',
  styles: []
})
export class CategoryListComponent implements OnInit {

  categories: ProductCategory[] = [];

  constructor(
    private categoriesService: CategoriesService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this._getCategories();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Confirm delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          () => {
            this._getCategories();
          },
          () => {
            this._getCategories();
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

  updateCategory(categoryId: string){
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }



  private _getCategories(){
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }
}
