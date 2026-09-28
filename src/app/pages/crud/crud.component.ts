import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  User,
  UserService
} from '../../services/user.service';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit {

  userForm!: FormGroup;

  users: User[] = [];

  editingId: string | null = null;

  loading = false;

  message = '';

  messageType: 'success' | 'error' = 'success';


  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}


  ngOnInit(): void {

    this.userForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      branch: ['', Validators.required]
    });

  }


  submitForm(): void {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    const user: User = this.userForm.value;


    // UPDATE
    if (this.editingId) {

      this.userService
        .updateUser(this.editingId, user)
        .subscribe({

          next: (response) => {

            this.showMessage(
              'User updated successfully'
            );

            this.resetForm();

            this.fetchUsers();

          },

          error: (error) => {

            this.loading = false;

            this.showMessage(
              error.error?.message ||
              'Unable to update user',
              'error'
            );

          }

        });

      return;
    }


    // CREATE
    this.userService
      .createUser(user)
      .subscribe({

        next: (response) => {

          this.showMessage(
            'User added successfully'
          );

          this.resetForm();

          this.fetchUsers();

        },

        error: (error) => {

          this.loading = false;

          this.showMessage(
            error.error?.message ||
            'Unable to create user',
            'error'
          );

        }

      });

  }


  fetchUsers(): void {

    this.loading = true;

    this.userService
      .getUsers()
      .subscribe({

        next: (response) => {

          this.users = response.data || [];

          this.loading = false;

        },

        error: (error) => {

          this.loading = false;

          this.showMessage(
            'Unable to fetch users',
            'error'
          );

        }

      });

  }


  editUser(user: User): void {

    this.editingId = user._id || null;

    this.userForm.patchValue({
      userId: user.userId,
      name: user.name,
      branch: user.branch
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }


  deleteUser(user: User): void {

    if (!user._id) {
      return;
    }

    const confirmed = confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.loading = true;

    this.userService
      .deleteUser(user._id)
      .subscribe({

        next: () => {

          this.showMessage(
            'User deleted successfully'
          );

          this.fetchUsers();

        },

        error: () => {

          this.loading = false;

          this.showMessage(
            'Unable to delete user',
            'error'
          );

        }

      });

  }


  resetForm(): void {

    this.userForm.reset();

    this.editingId = null;

    this.loading = false;

  }


  showMessage(
    message: string,
    type: 'success' | 'error' = 'success'
  ): void {

    this.message = message;

    this.messageType = type;

    setTimeout(() => {

      this.message = '';

    }, 3000);

  }

}