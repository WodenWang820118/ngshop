import { CategoriesService, Category } from '@ngshop/products';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoriesService: CategoriesService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      color: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      icon: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
    this.checkEditMode();
  }

  checkEditMode() {
    const categoryId = this.router.url.split('/')[3];
    if (categoryId) {
      this.editMode = true;
      this.categoriesService.getOne(categoryId).subscribe(category => {
        this.form.patchValue({
          name: category?.name,
          color: category?.color,
          icon: category?.icon,
        });
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    console.log(this.form.value);

    const category: Category = {
      name: this.form.get('name')?.value,
      color: this.form.get('color')?.value,
      icon: this.form.get('icon')?.value,
    };

    this.editMode
      ? this.updateCategory(category)
      : this.createCategory(category);
  }

  createCategory(category: Category) {
    this.categoriesService.create(category).subscribe({
      next: res => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category created successfully',
        });
      },
      error: error => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category not created',
        });
      },
      complete: () => {
        setTimeout(() => {
          this.form.reset();
          this.isSubmitted = false;
          this.router.navigate(['/categories']);
        }, 1500);
      },
    });
  }

  updateCategory(category: Category) {
    const categoryId = this.router.url.split('/')[3];
    this.categoriesService.update(category, categoryId).subscribe({
      next: res => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category updated successfully',
        });
      },
      error: error => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category not updated',
        });
      },
      complete: () => {
        setTimeout(() => {
          this.form.reset();
          this.isSubmitted = false;
          this.router.navigate(['/categories']);
        }, 1500);
      },
    });
  }
}
