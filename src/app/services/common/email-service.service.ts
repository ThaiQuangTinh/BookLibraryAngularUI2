import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  // Variable to contain api url to send code via email, with purpose is verify account of user
  private sendCodeToVerifyApiUrl: string = `${environment.authenService}/mail/send-active-code`;

  constructor(
    private http: HttpClient
  ) {

  }

  // Service to send code to email of user
  public senCodeToEmail(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    
    return this.http.get<any>(this.sendCodeToVerifyApiUrl, {params});
  }
  
}
