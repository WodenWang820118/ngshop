import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { ErrorMsgComponent } from './errorMsg.component';

@NgModule({
  declarations: [ErrorMsgComponent],
  imports: [CommonModule],
  exports: [ErrorMsgComponent],
})
export class ErrorMsgModule {}
