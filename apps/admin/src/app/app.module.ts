// ng modules and routes
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';

// primeng
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';

// custom modules
import { UiModule } from '@ngshop/ui';
import { ProductsModule } from '@ngshop/products';
import { UiFormModule } from '@ngshop/ui/form';
import { OrdersModule } from '@ngshop/orders';
import { UsersModule } from '@ngshop/users';

// components
import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';

// services
import { MessageService, ConfirmationService } from 'primeng/api';

const ngModules = [
  BrowserModule,
  RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  BrowserAnimationsModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
];

const primeng = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  ProductsModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
];

const customModules = [UiModule, UiFormModule, UsersModule, OrdersModule];
const services = [MessageService, ConfirmationService];

const components = [
  AppComponent,
  ShellComponent,
  SidebarComponent,
  DashboardComponent,
  CategoriesListComponent,
  CategoriesFormComponent,
  ProductsFormComponent,
  ProductsListComponent,
  UsersFormComponent,
  UsersListComponent,
  OrdersListComponent,
];

@NgModule({
  declarations: [components],
  imports: [...ngModules, ...primeng, ...customModules],
  providers: [...services],
  bootstrap: [AppComponent],
  exports: [
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesListComponent,
  ],
})
export class AppModule {}
