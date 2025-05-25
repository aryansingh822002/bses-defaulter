import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

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

  toggleForm(formName: 'login') {
    this.activeForm = formName;
  }

  onLogin() {
    if (!this.loginData.username || !this.loginData.password) {
      alert("Please enter both username and password");
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: () => {
        const role = this.authService.getRole();
        console.log('User Role:', role);

        alert('Login successful!');

        // Redirect based on role
        if (role === 'Admin Role for Bucket Creation') {
          this.router.navigate(['/home/master']);
        } else if (role === 'Agency User' || role === 'Circle Head') {
          this.router.navigate(['/home/allotment']);
        } else if (role === 'Recovery Officer' || role === 'Commercial Officer') {
          this.router.navigate(['/home/recovery-report']);
        } else {
          this.router.navigate(['/home']); // Default fallback
        }
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Login failed, please try again.');
      }
    });
  }
}
