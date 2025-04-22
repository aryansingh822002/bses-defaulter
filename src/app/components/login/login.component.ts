import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  activeForm: 'login' | 'register' | 'change' = 'login';

  // Login form model
  loginData = {
    username: '',
    password: ''
  };

  // Register form model
  registerData = {
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  };

  // Change password model
  changePasswordData = {
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService) {}

  toggleForm(formName: 'login' | 'register' | 'change') {
    this.activeForm = formName;
  }

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      alert("Please enter both username and password");
      return;
    }
  
    this.authService.login(this.loginData).subscribe(
      (res: any) => {
        alert('Login successful!');
        console.log(res);
      },
      (err: any) => {
        console.error(err);
        alert(err.error || 'Login failed');
      }
    );
  }
  
  onRegister() {
    if (!this.registerData.username || !this.registerData.email || !this.registerData.password) {
      alert("Please fill all fields");
      return;
    }
  
    if (this.registerData.password !== this.registerData.repeatPassword) {
      alert("Passwords do not match");
      return;
    }
  
    this.authService.register(this.registerData).subscribe(
      (res: any) => {
        alert("Registered successfully!");
        console.log(res); // For debugging the response
        this.toggleForm('login'); // Automatically redirect to login
      },
      (err: any) => {
        console.error(err);
        alert(err.error || 'Registration failed');
      }
    );
  }
  
  
  onChangePassword() {
    const { username, oldPassword, newPassword, confirmPassword } = this.changePasswordData;
  
    if (!username || !oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
  
    const payload = {
      username,
      oldPassword,
      newPassword
    };
  
    this.authService.changePassword(payload).subscribe(
      (res: any) => {
        alert("Password changed successfully!");
        console.log(res);
        this.toggleForm('login');
      },
      (err: any) => {
        console.error(err);
        alert(err.error || 'Password change failed');
      }
    );
  }
}