import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductCategory } from '@nick/products';
import { MessageService } from 'primeng/api';
import { timer, lastValueFrom } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;

  constructor(private formBuilder: FormBuilder, 
              private categoriesService: CategoriesService, 
              private messageService: MessageService,
              private location: Location,
              private route: ActivatedRoute,
      
              ) { }

  ngOnInit(): void {
    this._checkEditMode();
    
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });
  }

  onCancel(){
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;

    if(this.form.invalid){
      return;
    }
    const category : ProductCategory = {
      _id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value,
    };
    if(this.editMode){
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }

  }

  private _addCategory(category: ProductCategory) {
    this.categoriesService.createCategory(category).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail:'Category was created'});
        timer(2000).toPromise().then(() => {
          this.location.back();
        });
      },
      error: () => {
        this.messageService.add({ severity:'error', summary: 'Error', detail:'Category could not be created'});
      },
    });  
  }

  private _updateCategory(category: ProductCategory){
    this.categoriesService.updateCategory(category).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail:'Category was updated'});
        timer(2000).toPromise().then(() => {
          this.location.back();
        });
      },
      error: () => {
        this.messageService.add({ severity:'error', summary: 'Error', detail:'Category could not be updated'});
      },
    }); 
  }

  private _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        })
      }
    });
  }


  get categoryForm() {
    return this.form.controls;
  }
}
