import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginModel, RegisterModel } from 'src/app/models/register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  register(
    url: string,
    payload: FormGroup<RegisterModel>['value']
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}${url}`, payload);
  }

  login(url: string, payload: FormGroup<LoginModel>['value']): Observable<any> {
    return this.http.post(`${this.apiUrl}${url}`, payload);
  }

  get(url: string): Observable<any> {
    const token = localStorage.getItem('token'); // Replace with your token

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}${url}`, { headers });
  }

  post(url: string, payload: any): Observable<any> {
    const token = localStorage.getItem('token'); // Replace with your token

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}${url}`, payload, { headers });
  }

  patch(url: string, payload: any) {
    const token = localStorage.getItem('token'); // Replace with your token

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.apiUrl}${url}`, payload, { headers });
  }
}
