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

  // Sample data
  roles = [
    { roleId: 1, role: 'Agency User', accountClass: 'SLCC', createDate: new Date(2024, 0, 15) },
    { roleId: 2, role: 'Circle Head', accountClass: 'SLCC', createDate: new Date(2024, 0, 16) },
    { roleId: 3, role: 'Call Center Executive', accountClass: 'SLCC', createDate: new Date(2024, 0, 17) },
    { roleId: 4, role: 'Call Center Admin', accountClass: 'SLCC', createDate: new Date(2024, 0, 18) },
    { roleId: 5, role: 'Normal User', accountClass: 'OTHERS', createDate: new Date(2024, 0, 19) },
    { roleId: 6, role: 'Recovery Officer', accountClass: 'SLCC', createDate: new Date(2024, 0, 20) },
    { roleId: 7, role: 'Commercial Officer', accountClass: 'SLCC', createDate: new Date(2024, 0, 21) },
    { roleId: 8, role: 'Admin Role for Bucket Creation', accountClass: 'SLCC', createDate: new Date(2024, 0, 22) },
    { roleId: 9, role: 'Call Center IVRS', accountClass: 'SLCC', createDate: new Date(2024, 0, 23) },
    { roleId: 10, role: 'Agency User', accountClass: 'OTHERS', createDate: new Date(2024, 0, 24) }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.roleForm = this.fb.group({
      role: ['', Validators.required],
      accountClass: ['', Validators.required]
    });
  }

  toggleRoleTable(): void {
    this.showRoleTable = !this.showRoleTable;
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      if (this.isEditMode && this.currentEditId) {
        // Update existing role
        const index = this.roles.findIndex(r => r.roleId === this.currentEditId);
        if (index !== -1) {
          this.roles[index] = {
            ...this.roles[index],
            role: this.roleForm.value.role,
            accountClass: this.roleForm.value.accountClass
          };
        }
      } else {
        // Add new role
        const newRole = {
          roleId: this.roles.length + 1,
          role: this.roleForm.value.role,
          accountClass: this.roleForm.value.accountClass,
          createDate: new Date()
        };
        this.roles.push(newRole);
      }
      
      this.onReset();
    } else {
      this.roleForm.markAllAsTouched();
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

  deleteRole(roleId: number): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roles = this.roles.filter(role => role.roleId !== roleId);
    }
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
