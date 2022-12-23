import { Injectable } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CrudUiService {
  operationComplete = new BehaviorSubject(false);

  constructor(
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {}

  createItem(service: any, type: string, item: any) {
    service.create(item).subscribe({
      next: (res: any) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${type} created successfully`,
        });
        this.operationComplete.next(true);
      },
      error: (error: any) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${type} not created`,
        });
      },
      complete: () => {
        console.log('complete');
        this.operationComplete.next(false);
      },
    });
  }

  readItem(service: any, type: string, id: string) {
    service.getOne(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${type} read successfully`,
        });
        this.operationComplete.next(true);
      },
      error: (error: any) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${type} not read`,
        });
      },
      complete: () => {
        console.log('complete');
        this.operationComplete.next(false);
      },
    });
  }

  updateItem(service: any, type: string, item: any, id: string) {
    service.update(item, id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${type} updated successfully`,
        });
        this.operationComplete.next(true);
      },
      error: (error: any) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${type} not updated`,
        });
      },
      complete: () => {
        console.log('complete');
        this.operationComplete.next(false);
      },
    });
  }

  deleteItem(service: any, type: string, id: string) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this ${type}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        service.delete(id).subscribe({
          next: (res: any) => {
            console.log(res);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `${type} deleted successfully`,
            });
            this.operationComplete.next(true);
          },
          error: (error: any) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${type} not deleted`,
            });
          },
          complete: () => {
            console.log('complete');
            this.operationComplete.next(false);
          },
        });
      },
    });
  }
}
