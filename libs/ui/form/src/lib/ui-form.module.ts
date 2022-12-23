import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// customized modules
import { FormTemplateComponent } from './form-template/form-template.component';
import { TextInputComponent } from './text-input/text-input.component';
import { ErrorMsgModule } from './errorMsg/errorMsg.module';

// services
import { CategoriesService } from '@ngshop/products';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormTemplateComponent,
    TextInputComponent,
    ErrorMsgModule,
  ],
  providers: [CategoriesService],
  exports: [FormTemplateComponent, TextInputComponent, ErrorMsgModule],
})
export class UiFormModule {}
