import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenServiceService {

  // Define base api url for all api
  private baseApiUrl: string = `${environment.authenService}/v3`;

  constructor(
    private http: HttpClient
  ) {

  }

  // Service to validate token 
  public validateToken(token: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/validate`, {},
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
        }
      });
  }

  // Service to login, return token if success
  public login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseApiUrl}/login`,
      { username, password },
    );
  }

  // Service to active account
  public activeAccount(code: string, token: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseApiUrl}/activate-account`,
      { code },
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
        }
      }
    );
  }

  // Service to rest password
  public resetPassword(code: string, email: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/reset-password`,
      { email, code, newPassword },
    );
  }

  // Service to decode token
  public decodeToken(token: string): JwtPayload {
    return jwtDecode<JwtPayload>(token);
  }

  // Service to save token
  public saveToken(token: string, decodedData: JwtPayload): void {
    localStorage.setItem('authen_token', `Bearer ${token}`);
    localStorage.setItem('fullname', decodedData.fullname);
    localStorage.setItem('username', decodedData.username);
    localStorage.setItem('role_id', decodedData.roleId.toString());
    localStorage.setItem('image_url', decodedData.imageUrl);
    localStorage.setItem('email', decodedData.email);
    localStorage.setItem('username', decodedData.username);
  }

  // Service to get token
  public getToken(): string | null {
    return localStorage.getItem('authen_token');
  }

  // Service to clear token
  public clearToken(): void {
    localStorage.removeItem('authen_token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('username');
    localStorage.removeItem('role_id');
    localStorage.removeItem('image_url');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
  }

}

// Define interface for JwtPayload
interface JwtPayload {
  fullname: string,
  username: string,
  roleId: number,
  isActivated: boolean,
  imageUrl: string,
  email: string,
}
