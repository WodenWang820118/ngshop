import { CategoriesService, Category } from '@ngshop/products';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudUiService } from '../../shared/services/crudUi.service';

@Component({
  selector: 'admin-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent {
  categories: Category[] = [];
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly router: Router,
    private readonly crudUiService: CrudUiService
  ) {
    this.categoriesService.get().subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteCategory(id: string) {
    this.crudUiService.deleteItem(this.categoriesService, 'category', id);
    this.crudUiService.operationComplete.subscribe(success => {
      if (success) this.updateCategoryUi(id);
    });
  }

  updateCategoryUi(id: string) {
    this.categories = this.categories.filter(category => category._id !== id);
  }

  updateCategory(categoryId: string) {
    this.router.navigate(['categories', 'form', categoryId]);
  }
}
