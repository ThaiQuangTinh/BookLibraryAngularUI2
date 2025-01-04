import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookLoanInfoServiceService {

  // Define base api url
  private baseApiUrl: string = 'http://localhost:8300/loans-for-user';

  constructor(
    private http: HttpClient
  ) { }

  // Service to get borrowing history
  public getBorrowingHistory(username: string): Observable<any> {
    const params = new HttpParams()
      .set('readerUsername', username.toString())
      .set('month', '')
      .set('year', '')

    return this.http.get(`${this.baseApiUrl}/get-return-page`, { params });
  }

  // Service to get current borrowed
  public getCurrentBorrowed(username: string): Observable<any> {
    const params = new HttpParams()
      .set('readerUsername', username.toString())
      .set('month', '')
      .set('year', '')

    return this.http.get(`${this.baseApiUrl}/get-borrowed-page`, { params });
  }

}
