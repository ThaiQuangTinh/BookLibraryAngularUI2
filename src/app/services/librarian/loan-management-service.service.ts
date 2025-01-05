import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenServiceService } from '../common/authen-service.service';
import { last, lastValueFrom, Observable } from 'rxjs';
import { CommonResponse } from '../../models/common-response.model';
import { Loan } from '../../models/loan.model';

@Injectable({
  providedIn: 'root',
})
export class LoanManagementServiceService {
  // Define base api url
  private baseApiUrl: string = 'http://localhost:8300';
  private bookLendingUrl: string = '/loans-command/post-borrow-book';
  private bookReturnUrl: string = '/loans-command/post-return-book';
  private getAllBorrowedUrl: string = '/loans/get-borrowed-page';
  private getAllOverduedUrl: string = '/loans/get-overdue-page';

  constructor(
    private http: HttpClient,
    private authenService: AuthenServiceService
  ) {}

  private matchRoute(url: string) {
    return this.baseApiUrl + url;
  }

  private createHeader(): HttpHeaders {
    const token = this.authenService.getToken() || '';

    return new HttpHeaders({
      Authorization: token,
      'Content-Type': 'application/json',
    });
  }

  private handelLendingBook(
    userCode: string,
    bookCopyCode: string
  ): Observable<CommonResponse<any>> {
    const librarianUserName = localStorage.getItem('username') ?? '';
    const headers = this.createHeader();
    const body = {
      readerUsername: userCode,
      librarianUsername: librarianUserName,
      copyId: bookCopyCode,
    };
    return this.http.post<CommonResponse<any>>(
      this.matchRoute(this.bookLendingUrl),
      JSON.stringify(body),
      { headers: headers }
    );
  }

  private handelReturningBook(
    bookCopyCode: string
  ): Observable<CommonResponse<any>> {
    const headers = this.createHeader();
    const body = {
      copyId: bookCopyCode,
    };
    return this.http.post<CommonResponse<any>>(
      this.matchRoute(this.bookReturnUrl),
      JSON.stringify(body),
      { headers: headers }
    );
  }

  private handelGetBorrowedAll(): Observable<CommonResponse<Loan[]>> {
    const headers = this.createHeader();
    return this.http.get<CommonResponse<Loan[]>>(
      this.matchRoute(this.getAllBorrowedUrl),
      { headers: headers }
    );
  }

  private handelGetOverDueAll(): Observable<CommonResponse<Loan[]>> {
    const headers = this.createHeader();
    return this.http.get<CommonResponse<Loan[]>>(
      this.matchRoute(this.getAllOverduedUrl),
      { headers: headers }
    );
  }

  public async lenddingBook(
    userCode: string,
    bookCopyCode: string
  ): Promise<any> {
    const res = await lastValueFrom(
      this.handelLendingBook(userCode, bookCopyCode)
    );
    return res.data;
  }

  public async getBorrowedAll(): Promise<Loan[]> {
    const res = await lastValueFrom(this.handelGetBorrowedAll());
    return res.data;
  }

  public async getOverDueAll(): Promise<Loan[]> {
    const res = await lastValueFrom(this.handelGetOverDueAll());
    return res.data;
  }

  public async returnBook(copyId: string) {
    return await lastValueFrom(this.handelReturningBook(copyId));
  }
}
