import { UsersService, User } from '@ngshop/users';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudUiService } from '../../shared/services/crudUi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  // TODO: add fields
  row1Fields = ['name', 'email', 'passwordHash'];
  row2Fields = ['street', 'apartment', 'city'];
  row3Fields = ['zipcode', 'country', 'phone'];
  fields = [this.row1Fields, this.row2Fields, this.row3Fields];

  constructor(
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly crudUiService: CrudUiService
  ) {
    this.form = this.initForm();
    this.checkEditMode();
  }

  initForm() {
    return this.fb.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      passwordHash: ['', Validators.compose([Validators.required])],

      street: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      apartment: [''],
      city: ['', Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.required])],
      country: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      phone: [''],
      isAdmin: [false, Validators.compose([Validators.required])],
    });
  }

  checkEditMode() {
    const userId = this.router.url.split('/')[3];
    if (userId) {
      this.editMode = true;
      this.usersService.getOne(userId).subscribe(user => {
        this.form.patchValue({
          name: user?.name,
          email: user?.email,
          passwordHash: user?.passwordHash,
          street: user?.street,
          apartment: user?.apartment,
          city: user?.city,
          zipcode: user?.zipCode,
          country: user?.country,
          phone: user?.phone,
          isAdmin: user?.isAdmin,
        });
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    console.log(this.form.value);

    const user: User = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      passwordHash: this.form.get('passwordHash')?.value,
      street: this.form.get('street')?.value,
      apartment: this.form.get('apartment')?.value,
      city: this.form.get('city')?.value,
      zipCode: this.form.get('zipcode')?.value,
      country: this.form.get('country')?.value,
      phone: this.form.get('phone')?.value,
      isAdmin: this.form.get('isAdmin')?.value,
    };

    this.editMode ? this.updateUser(user) : this.createUser(user);
  }

  createUser(user: User) {
    this.crudUiService.createItem(this.usersService, 'User', user);
    this.crudUiService.operationComplete.subscribe(success => {
      if (success) {
        setTimeout(() => {
          this.form.reset();
          this.isSubmitted = false;
          this.router.navigate(['/users']);
        }, 1500);
      }
    });
  }

  updateUser(user: User) {
    const userId = this.router.url.split('/')[3];
    this.crudUiService.updateItem(this.usersService, 'User', user, userId);
  }
}
