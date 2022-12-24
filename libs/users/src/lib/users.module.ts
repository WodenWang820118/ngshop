import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from './services/users.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
