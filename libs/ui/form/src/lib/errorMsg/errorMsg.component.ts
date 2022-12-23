import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngshop-error-msg',
  templateUrl: './errorMsg.component.html',
  styleUrls: ['./errorMsg.component.scss'],
})
export class ErrorMsgComponent {
  @Input() controlName = '';
  @Input() isSubmitted = false;
  @Input() form!: FormGroup;
}
