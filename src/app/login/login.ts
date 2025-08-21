import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { Header } from '../header/header';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'], 
  imports: [CommonModule, ReactiveFormsModule, Header , RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;   
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      showPassword: [false]   
    });
  }

  
  get showPassword(): boolean {
    return !!this.loginForm.get('showPassword')?.value;
  }

  onSubmit(): void {
  if (this.loginForm.valid) {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 401 || err.status === 404) {
          this.errorMessage = 'This email is not registered, please register first.';
        } else {
          this.errorMessage = 'Invalid credentials or server error. Please try again.';
        }
      }
    });
  }
}

}
