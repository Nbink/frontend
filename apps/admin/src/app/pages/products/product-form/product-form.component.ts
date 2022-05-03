import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ProductsService, Product, CategoriesService } from '@nick/products';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent implements OnInit {
  editMode = false;
  form: FormGroup;
  isSubmitted = false;
  currentProductId: string;
  categories = [];
  imageDisplay: string | ArrayBuffer;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private route: ActivatedRoute,
              private productsService: ProductsService,
              private categoriesService: CategoriesService,
              private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this._checkEditMode();
    this._initForm();
    this._getCategories();
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  private _updateProduct(productFormData: FormData){
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Success', detail:'Product was updated'});
        timer(2000).toPromise().then(() => {
          this.location.back();
        });
      },
      error: () => {
        this.messageService.add({ severity:'error', summary: 'Error', detail:'Product could not be updated'});
      },
    }); 
  }
  
  onCancel(){
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;

    if(this.form.invalid) return;

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key)=>{
      productFormData.append(key, this.productForm[key].value);

    });

    if(this.editMode){
      this._updateProduct(productFormData);
    }else{
      this._addProduct(productFormData);
    }

   }

   private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe({
      next: (product: Product) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail:'Product was created'});
        timer(2000).toPromise().then(() => {
          this.location.back();
        });
      },
      error: () => {
        this.messageService.add({ severity:'error', summary: 'Error', detail:'Product could not be created'});
      },
    });  
  }
   
  onImageUpload(event){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image:file});
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

  private _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.description.setValue(product.description);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.price.setValue(product.price);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.productForm.category.setValue(product.category._id);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        })
      }
    });
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      countInStock: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      richDescription: [''],
      isFeatured: [false],
    })
  }

  get productForm(){
    return this.form.controls;
  }
}
