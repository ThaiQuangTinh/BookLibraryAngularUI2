import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenServiceService } from '../common/authen-service.service';
import { Loan } from '../../models/loan.model';
import { CommonResponse } from '../../models/common-response.model';

@Injectable({
  providedIn: 'root'
})
export class BookLoanInfoServiceService {

  // Define base api url
  private baseApiUrl: string = 'http://localhost:8300/loans-for-user';

  constructor(
    private http: HttpClient,
    private authenService: AuthenServiceService
  ) { }

  // Service to get borrowing history
  public getBorrowingHistory(username: string): Observable<CommonResponse<Loan[]>> {
    const params = new HttpParams()
      .set('readerUsername', username.toString())
      .set('month', '')
      .set('year', '');

    const headers = new HttpHeaders()
      .set('Authorization', this.authenService.getToken() || '');

    return this.http.get<CommonResponse<Loan[]>>(`${this.baseApiUrl}/get-return-page`, { params, headers });
  }

  // Service to get current borrowed
  public getCurrentBorrowed(username: string): Observable<CommonResponse<Loan[]>> {
    const headers = new HttpHeaders()
      .set('Authorization', this.authenService.getToken() || '');

    const params = new HttpParams()
      .set('readerUsername', username.toString());

    return this.http.get<CommonResponse<Loan[]>>(`${this.baseApiUrl}/get-borrowed-page`, { params, headers });
  }

  // Service to get current borrowed
  public getOverdue(username: string): Observable<CommonResponse<Loan[]>> {
    const headers = new HttpHeaders()
      .set('Authorization', this.authenService.getToken() || '');

    const params = new HttpParams()
      .set('readerUsername', username.toString());

    return this.http.get<CommonResponse<Loan[]>>(`${this.baseApiUrl}/get-overdue-page`, { params, headers });
  }


}
