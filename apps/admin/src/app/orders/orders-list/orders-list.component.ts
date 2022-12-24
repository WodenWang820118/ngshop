import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudUiService } from '../../shared/services/crudUi.service';
import { OrdersService, Order } from '@ngshop/orders';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent {
  orders: Order[] = [];
  constructor(
    private readonly ordersService: OrdersService,
    private readonly router: Router,
    private readonly crudUiService: CrudUiService
  ) {
    this.ordersService.get().subscribe(orders => {
      this.orders = orders;
    });
  }

  deleteOrder(id: string) {
    this.crudUiService.deleteItem(this.ordersService, 'order', id);
    this.crudUiService.operationComplete.subscribe(success => {
      if (success) this.updateOrderUi(id);
    });
  }

  updateOrderUi(id: string) {
    this.orders = this.orders.filter(order => order._id !== id);
  }

  updateOrder(orderId: string) {
    this.router.navigate(['orders', 'form', orderId]);
  }
}
