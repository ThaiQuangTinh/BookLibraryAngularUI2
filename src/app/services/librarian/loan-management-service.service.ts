import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanManagementServiceService {

  // Define base api url
  private baseApiUrl: string = 'http://localhost:8300/loans-command';

  constructor(
    private http: HttpClient
  ) {

  }

  
}
