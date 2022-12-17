import { CategoriesService, Category } from '@ngshop/products';
import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent {
  categories: Category[] = [];
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly router: Router
  ) {
    this.categoriesService.get().subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.delete(id).subscribe({
          next: res => {
            console.log(res);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category deleted successfully',
            });
          },
          error: error => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category not deleted',
            });
          },
          complete: () => {
            // update the ui as well
            // note the _id convention is from the backend, must apply
            this.categories = this.categories.filter(
              category => category._id !== id
            );
          },
        });
      },
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigate(['categories', 'form', categoryId]);
  }
}
