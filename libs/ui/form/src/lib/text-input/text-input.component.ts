import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  selector: 'ngshop-text-input',
  template: `
    <input
      #input
      required
      [id]="controlName"
      type="text"
      [value]="value"
      (change)="changeValue(input.value)"
      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() controlName = '';
  value = '';
  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  changeValue(value: any) {
    console.log('changeValue', value);
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
