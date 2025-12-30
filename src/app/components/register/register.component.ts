import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      phoneNumber: ['']
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe(
      response => {
        this.loading = false;
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    );
  }

  signupWithGoogle(): void {
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=' + 
      encodeURIComponent(window.location.origin + '/auth/google-signup') + 
      '&response_type=code&scope=openid%20profile%20email';
  }

  signupWithMicrosoft(): void {
    window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=YOUR_MICROSOFT_CLIENT_ID&redirect_uri=' + 
      encodeURIComponent(window.location.origin + '/auth/microsoft-signup') + 
      '&response_type=code&scope=openid%20profile%20email';
  }

  signupWithApple(): void {
    window.location.href = 'https://appleid.apple.com/auth/authorize?client_id=YOUR_APPLE_CLIENT_ID&redirect_uri=' + 
      encodeURIComponent(window.location.origin + '/auth/apple-signup') + 
      '&response_type=code&scope=openid%20profile%20email&response_mode=query';
  }
}
