import { Component } from '@angular/core';
import { Product, ProductsService } from '@ngshop/products';
import { CrudUiService } from '../../shared/services/crudUi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  products: Product[] = [];
  constructor(
    private readonly productsService: ProductsService,
    private readonly crudUiService: CrudUiService,
    private readonly router: Router
  ) {
    this.productsService.get().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(id: string) {
    this.crudUiService.deleteItem(this.productsService, 'product', id);
    this.crudUiService.operationComplete.subscribe(success => {
      if (success) this.updateProductUi(id);
    });
  }

  updateProductUi(id: string) {
    this.products = this.products.filter(product => product._id !== id);
  }

  updateProduct(productId: string) {
    console.log(productId);
    this.router.navigate(['products', 'form', productId]);
  }
}
