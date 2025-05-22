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
  selector: 'app-user-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent {
  userForm: FormGroup;
  passwordForm: FormGroup;
  showUserTable = false;
  resetPasswordMode = false;
  isEditMode = false;
  currentEditId: string | null = null;
  selectedUser: any = null;
  passwordStrength = 'weak';

  // Sample roles from Role Master
  roles = [
    { roleId: 1, role: 'Agency User', accountClass: 'SLCC' },
    { roleId: 2, role: 'Circle Head', accountClass: 'SLCC' },
    { roleId: 3, role: 'Call Center Executive', accountClass: 'SLCC' },
    { roleId: 4, role: 'Call Center Admin', accountClass: 'SLCC' },
    { roleId: 5, role: 'Normal User', accountClass: 'OTHERS' },
    { roleId: 6, role: 'Recovery Officer', accountClass: 'SLCC' },
    { roleId: 7, role: 'Commercial Officer', accountClass: 'SLCC' },
    { roleId: 8, role: 'Admin Role for Bucket Creation', accountClass: 'SLCC' },
    { roleId: 9, role: 'Call Center IVRS', accountClass: 'SLCC' }
  ];

  // Sample users
  users = [
    { userId: 'U001', username: 'admin1', division: 'Division 1', accountClass: 'SLCC', role: 'Admin Role for Bucket Creation', active: true },
    { userId: 'U002', username: 'cc_exec1', division: 'Division 2', accountClass: 'SLCC', role: 'Call Center Executive', active: true },
    { userId: 'U003', username: 'recovery1', division: 'Division 3', accountClass: 'SLCC', role: 'Recovery Officer', active: false },
    { userId: 'U004', username: 'agency1', division: 'Division 1', accountClass: 'SLCC', role: 'Agency User', active: true },
    { userId: 'U005', username: 'normal1', division: 'Division 4', accountClass: 'OTHERS', role: 'Normal User', active: true }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    // Main user form
    this.userForm = this.fb.group({
      userId: ['', [Validators.required, Validators.pattern(/^U\d{3}$/)]],
      username: ['', Validators.required],
      role: ['', Validators.required],
      division: ['', Validators.required],
      accountClass: ['', Validators.required]
    });

    // Password reset form
    this.passwordForm = this.fb.group({
      username: [''],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });

    // Watch password changes for strength indicator
    this.passwordForm.get('newPassword')?.valueChanges.subscribe(val => {
      this.calculatePasswordStrength(val);
    });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('repeatPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  calculatePasswordStrength(password: string) {
    // Simple strength calculation
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    const length = password.length;

    if (length > 10 && hasLetters && hasNumbers && hasSpecial) {
      this.passwordStrength = 'strong';
    } else if (length > 6 && hasLetters && hasNumbers) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'weak';
    }
  }

  toggleUserTable(): void {
    this.showUserTable = !this.showUserTable;
  }

  enableResetPassword(): void {
    if (this.userForm.valid) {
      this.resetPasswordMode = true;
      this.selectedUser = {
        username: this.userForm.get('username')?.value
      };
      this.passwordForm.patchValue({
        username: this.userForm.get('username')?.value
      });
    } else {
      alert('Please fill in all user details before resetting password');
    }
  }

  initiatePasswordReset(user: any): void {
    this.resetPasswordMode = true;
    this.selectedUser = user;
    this.passwordForm.reset();
    this.passwordForm.patchValue({
      username: user.username
    });
  }

  cancelResetPassword(): void {
    this.resetPasswordMode = false;
    this.selectedUser = null;
    this.passwordForm.reset();
  }

  onPasswordReset(): void {
    if (this.passwordForm.valid) {
      alert(`Password reset for ${this.selectedUser.username} was successful!`);
      this.cancelResetPassword();
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.isEditMode && this.currentEditId) {
        // Update existing user
        const index = this.users.findIndex(u => u.userId === this.currentEditId);
        if (index !== -1) {
          this.users[index] = {
            ...this.users[index],
            ...this.userForm.value,
            active: this.users[index].active // Preserve status
          };
        }
      } else {
        // Add new user
        const newUser = {
          ...this.userForm.value,
          active: true
        };
        this.users.push(newUser);
      }
      
      this.onReset();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  editUser(user: any): void {
    this.isEditMode = true;
    this.currentEditId = user.userId;
    this.userForm.patchValue({
      userId: user.userId,
      username: user.username,
      role: user.role,
      division: user.division,
      accountClass: user.accountClass
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(user => user.userId !== userId);
    }
  }

  toggleUserStatus(user: any): void {
    // In a real app, you would call an API here
    console.log(`User ${user.userId} status changed to ${user.active ? 'active' : 'inactive'}`);
  }

  onReset(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.currentEditId = null;
  }

  onClose(): void {
    this.router.navigate(['/home']);
  }
}