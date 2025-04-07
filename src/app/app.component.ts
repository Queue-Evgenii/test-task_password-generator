import { Component } from '@angular/core';
import { PasswordService } from './services/password.service';
import { FormsModule } from '@angular/forms';
import { PasswordOptions } from './models/password-params';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  passwordOptions: PasswordOptions = {
    length: 12,
    exclude_numbers: false,
    exclude_special_chars: false,
  }
  password = '';
  isLoading = false;
  error = '';

  constructor(private passwordService: PasswordService) {}

  isLengthValid(): boolean {
    return (
      typeof this.passwordOptions.length === 'number'
      && this.passwordOptions.length >= 4
      && this.passwordOptions.length <= 64
    );
  }

  generate() {
    this.error = '';
    this.isLoading = true;
    this.passwordService.generatePassword(this.passwordOptions)
      .subscribe({
        next: (res) => {
          this.password = res.random_password;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error generating password', err);
          this.error = err.error.error;
          this.isLoading = false;
        }
      });
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.password);
  }
}
