import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';

// primeng
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  selector: 'ngshop-form-template',
  template: `
    <div class="grid">
      <div class="col-12">
        <p-toolbar>
          <div class="toolbar-group-left"></div>
          <div class="toolbar-group-right">
            <p-button
              class="mr-2"
              styleClass="p-button-orimary"
              [label]="editMode ? 'Update' : 'Create'"
              icon="pi pi-plus"
              (onClick)="submit()">
            </p-button>
            <p-button
              styleClass="p-button-secondary"
              icon="pi pi-arrow-circle-left"
              label="Cancel"
              (onClick)="goPreviousPage()">
            </p-button>
          </div>
        </p-toolbar>
      </div>
    </div>
  `,
})
export class FormTemplateComponent {
  @Input() editMode = false;
  @Output() submitFormEvent: EventEmitter<string> = new EventEmitter();

  constructor(private location: Location) {}

  submit() {
    this.submitFormEvent.emit('submitFormEvent');
  }

  goPreviousPage() {
    this.location.back();
  }
}
