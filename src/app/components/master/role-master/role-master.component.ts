import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-role-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './role-master.component.html',
  styleUrl: './role-master.component.css'
})
export class RoleMasterComponent {
  roleForm: FormGroup;
  showRoleTable = false;
  isEditMode = false;
  currentEditId: number | null = null;

  roles: any[] = [];

  private apiUrl = 'http://localhost:5044/api/auth'; // Adjust base path if needed

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient,private snackBar: MatSnackBar) {
    this.roleForm = this.fb.group({
      role: ['', Validators.required],
      accountClass: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRolesFromApi();
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  loadRolesFromApi(): void {
    this.http.get<any>(`${this.apiUrl}/roles`, { headers: this.getAuthHeaders() }).subscribe({
      next: (data) => {
        const rolesArray: any[] = Array.isArray(data?.$values) ? data.$values : [];
        this.roles = rolesArray.map((r: any) => ({
          roleId: r.roleId,
          role: r.roleName,
          accountClass: r.accountClass,
          createDate: new Date(r.createDate)
        }));
      },
      error: (err) => {
        console.error('Failed to load roles', err);
      }
    });
  }

  toggleRoleTable(): void {
    this.showRoleTable = !this.showRoleTable;
  }

  onSubmit(): void {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }

    const payload = {
      roleName: this.roleForm.value.role, // match backend model
      accountClass: this.roleForm.value.accountClass
    };

    const headers = this.getAuthHeaders();

    if (this.isEditMode && this.currentEditId) {
      // PUT request (edit role)
      this.http.put(`${this.apiUrl}/roles/${this.currentEditId}`, payload, { headers }).subscribe({
        next: () => {
          this.loadRolesFromApi();
          this.onReset();
          this.snackBar.open('Role updated successfully!', 'Close', { duration: 3000 });
        },
        error: err => {
          console.error('Update failed:', err);
        }
      });
    } else {
      // POST request (add role)
      this.http.post(`${this.apiUrl}/roles`, payload, { headers }).subscribe({
        next: () => {
          this.loadRolesFromApi();
          this.onReset();
          this.snackBar.open('New role added!', 'Close', { duration: 3000 });
        },
        error: err => {
          console.error('Add role failed:', err);
        }
      });
    }
  }

  deleteRole(roleId: number): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.http.delete(`${this.apiUrl}/roles/${roleId}`, { headers: this.getAuthHeaders() }).subscribe({
        next: () => {
          this.loadRolesFromApi();
        },
        error: err => {
          console.error('Delete failed:', err);
        }
      });
    }
  }

  editRole(role: any): void {
    this.isEditMode = true;
    this.currentEditId = role.roleId;
    this.roleForm.patchValue({
      role: role.role,
      accountClass: role.accountClass
    });
  }

  onReset(): void {
    this.roleForm.reset();
    this.isEditMode = false;
    this.currentEditId = null;
  }

  onClose(): void {
    this.router.navigate(['/home']);
  }
}
