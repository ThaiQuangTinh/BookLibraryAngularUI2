import { Component } from '@angular/core';
import { BookLoanInfoServiceService } from '../../../services/reader/book-loan-info-service.service';
import { Loan } from '../../../models/loan.model';
import { lastValueFrom } from 'rxjs';
import { LoanStatus } from '../../../enums/loan-status.enum';

@Component({
  selector: 'app-reader-current-borrowed',
  templateUrl: './reader-current-borrowed.component.html',
  styleUrls: [
    './reader-current-borrowed.component.css',
    '../../../../assets/styles/table.css'
  ]
})
export class ReaderCurrentBorrowedComponent {

  public bookCurrentBorrowed: Loan[] = [];

  public returnIntime: Loan[] = [];

  public returnOverdue: Loan[] = [];


  constructor(
    private bookLoanInfoService: BookLoanInfoServiceService
  ) {

  }

  async ngOnInit() {
    this.returnIntime = (await this.getBookBorrowingHistory()) ?? [];
    this.returnOverdue = (await this.getOverdue())?.filter(item => {
      return item.status == LoanStatus.BORROWED;
    }) ?? [];

    this.bookCurrentBorrowed = [...this.returnIntime, ...this.returnOverdue];
  }

  // Function to fectch data
  public async getBookBorrowingHistory(): Promise<Loan[]> {
    const username = localStorage.getItem('username') || '';

    if (username) {
      try {
        const res = await lastValueFrom(this.bookLoanInfoService.getCurrentBorrowed(username));
        return res.data;
      } catch (err) {
        return [];
      }
    } else {
      return [];
    }
  }

  public async getOverdue(): Promise<Loan[]> {
    const username = localStorage.getItem('username') || '';

    if (username) {
      try {
        const res = await lastValueFrom(this.bookLoanInfoService.getOverdue(username));
        return res.data;
      } catch (err) {
        return [];
      }
    } else {
      return [];
    }
  }

}
