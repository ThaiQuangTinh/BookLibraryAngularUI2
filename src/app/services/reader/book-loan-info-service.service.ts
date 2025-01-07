import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenServiceService } from '../common/authen-service.service';
import { Loan } from '../../models/loan.model';
import { CommonResponse } from '../../models/common-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookLoanInfoServiceService {

  // Define base api url
  private baseApiUrl: string = `${environment.loanService}/loans-for-user`;

  constructor(
    private http: HttpClient,
    private authenService: AuthenServiceService
  ) { }

  // Service to get borrowing history (chỉ lấy đã trả đúng hạn, status = 2)
  public getBorrowingHistory(username: string): Observable<CommonResponse<Loan[]>> {
    const params = new HttpParams()
      .set('readerUsername', username.toString())

    const headers = new HttpHeaders()
      .set('Authorization', this.authenService.getToken() || '');

    return this.http.get<CommonResponse<Loan[]>>(`${this.baseApiUrl}/get-return-page`, { params, headers });
  }

  // Service to get current borrowed (chỉ lấy những cái chưa trả và còn hạn, status = 1 và ngày hiện tại < dueDate)
  public getCurrentBorrowed(username: string): Observable<CommonResponse<Loan[]>> {
    const headers = new HttpHeaders()
      .set('Authorization', this.authenService.getToken() || '');

    const params = new HttpParams()
      .set('readerUsername', username.toString());

    return this.http.get<CommonResponse<Loan[]>>(`${this.baseApiUrl}/get-borrowed-page`, { params, headers });
  }

  // Service to get current borrowed (lấy ra những cái mà ngày hiện tại > dueDate, mà status = 1 hoặc 3 ), (1: chưa trả, 3 đã trả và quá hạn)
  public getOverdue(username: string): Observable<CommonResponse<Loan[]>> {
    const headers = new HttpHeaders()
      .set('Authorization', this.authenService.getToken() || '');

    const params = new HttpParams()
      .set('readerUsername', username.toString());

    return this.http.get<CommonResponse<Loan[]>>(`${this.baseApiUrl}/get-overdue-page`, { params, headers });
  }


}
