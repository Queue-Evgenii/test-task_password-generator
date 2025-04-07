import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordOptions } from '../models/password-params';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = 'https://api.api-ninjas.com/v1/passwordgenerator';

  // TODO: Move this to a secure location
  // This is a public API key for demonstration purposes only. Do not use in production.
  private apiKey = 'ql9iaSRJcc5BesJ7ioJ2lA==7XT1vlki9ux6OTTx';

  constructor(private http: HttpClient) {}

  generatePassword(options: PasswordOptions): Observable<any> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey
    });

    const params = {
      length: options.length.toString(),
      exclude_numbers: options.exclude_numbers.toString(),
      exclude_special_chars: options.exclude_special_chars.toString()
    };

    return this.http.get(this.apiUrl, { headers, params });
  }
}
