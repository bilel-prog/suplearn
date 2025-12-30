import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      user => {
        this.loading = false;
        // Redirect based on role
        if (user.role === 'STUDENT') {
          this.router.navigate(['/student/dashboard']);
        } else if (user.role === 'PROFESSOR') {
          this.router.navigate(['/professor/dashboard']);
        } else if (user.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error => {
        this.loading = false;
        this.errorMessage = error.message || 'Login failed. Please try again.';
      }
    );
  }

  loginWithGoogle(): void {
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=' + 
      encodeURIComponent(window.location.origin + '/auth/google') + 
      '&response_type=code&scope=openid%20profile%20email';
  }

  loginWithMicrosoft(): void {
    window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=YOUR_MICROSOFT_CLIENT_ID&redirect_uri=' + 
      encodeURIComponent(window.location.origin + '/auth/microsoft') + 
      '&response_type=code&scope=openid%20profile%20email';
  }

  loginWithApple(): void {
    window.location.href = 'https://appleid.apple.com/auth/authorize?client_id=YOUR_APPLE_CLIENT_ID&redirect_uri=' + 
      encodeURIComponent(window.location.origin + '/auth/apple') + 
      '&response_type=code&scope=openid%20profile%20email&response_mode=query';
  }
}
