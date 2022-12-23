import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
} from '@ngshop/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CrudUiService } from '../../shared/services/crudUi.service';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent {
  editMode = false;
  isSubmitted = false;
  form: FormGroup;
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer | null = '';
  fields = ['name', 'brand', 'price'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly crudUiService: CrudUiService
  ) {
    this.form = this.initForm();
    this.getCategories();
    this.checkEditMode();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      imageUrl: [''],
      isFeatured: [false],
    });
  }

  checkEditMode() {
    const productId = this.router.url.split('/')[3];
    if (productId) {
      this.editMode = true;
      this.productsService.getOne(productId).subscribe(product => {
        this.form.patchValue({
          name: product?.name,
          brand: product?.brand,
          price: product?.price,
          category: product?.category,
          countInStock: product?.countInStock,
          description: product?.description,
          richDescription: product?.richDescription,
          imageUrl: product?.imageUrl,
          isFeatured: product?.isFeatured,
        });
        this.imageDisplay = product?.imageUrl;
      });
    }
  }

  getCategories() {
    this.categoriesService.get().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    console.log('submit', this.form.value);

    const formData = new FormData();
    Object.keys(this.form.value).map(key =>
      formData.append(key, this.form.get(key)?.value)
    );

    const product: Product = {
      name: this.form.get('name')?.value,
      brand: this.form.get('brand')?.value,
      price: this.form.get('price')?.value,
      category: this.form.get('category')?.value,
      countInStock: this.form.get('countInStock')?.value,
      description: this.form.get('description')?.value,
      richDescription: this.form.get('richDescription')?.value,
      imageUrl: this.form.get('imageUrl')?.value,
      isFeatured: this.form.get('isFeatured')?.value,
      dateCreated: new Date(),
      rating: 0,
      numReviews: 0,
    };

    // FIXME: save the image as file type
    // this.createProduct(formData);
    this.editMode ? this.updateProduct(product) : this.createProduct(product);
  }

  createProduct(product: Product) {
    this.crudUiService.createItem(this.productsService, 'Product', product);
  }

  updateProduct(product: Product) {
    this.crudUiService.updateItem(
      this.productsService,
      'Product',
      product,
      this.router.url.split('/')[3]
    );
  }

  // TODO: upload image as blob
  onImageUpload(event: Event) {
    console.log(event);
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      this.form.get('imageUrl')?.updateValueAndValidity();
      this.form.patchValue({
        imageUrl: file,
      });

      reader.onload = () => {
        this.imageDisplay = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
