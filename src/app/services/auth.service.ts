import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: Boolean = false;
  code: any;
  token: any;
  username: any;

  private apiUrl = environment.apiUrl;
  // private apiUrl = 'https://propertyapi.aocxy.com/';

  constructor(private http: HttpClient) { }

  login(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}api/login`;
    return this.http.post<any>(url, formData);
  }

  setAuthData(code: string, token: string, username: string) {
    sessionStorage.setItem("code", code);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    this.isLogged = true;
  }

  logout(): void {
    sessionStorage.clear();
    this.isLogged = false;
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem("token");
  }


}
