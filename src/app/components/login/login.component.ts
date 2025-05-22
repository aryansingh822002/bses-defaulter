import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeForm: 'login' | 'register' | 'change' = 'login';

  loginData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  toggleForm(formName: 'login' | 'register' | 'change') {
    this.activeForm = formName;
  }

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      alert("Please enter both username and password");
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        alert('Login successful!');
        console.log(res);

        // After login, you can get the role and redirect accordingly or just to home
        const role = this.authService.getRole();
        console.log('User Role:', role);

        // Navigate to home or role-based pages (example)
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Login failed, please try again.');
      }
    });
  }
}
