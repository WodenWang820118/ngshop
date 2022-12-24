import { UsersService, User } from '@ngshop/users';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudUiService } from '../../shared/services/crudUi.service';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  users: User[] = [];
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly crudUiService: CrudUiService
  ) {
    this.usersService.get().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: string) {
    this.crudUiService.deleteItem(this.usersService, 'user', id);
    this.crudUiService.operationComplete.subscribe(success => {
      if (success) this.updateUserUi(id);
    });
  }

  updateUserUi(id: string) {
    this.users = this.users.filter(user => user._id !== id);
  }

  updateUser(userId: string) {
    this.router.navigate(['users', 'form', userId]);
  }
}
