import { Component, OnInit } from '@angular/core';
import { BookLoanInfoServiceService } from '../../../services/reader/book-loan-info-service.service';
import { Loan } from '../../../models/loan.model';
import { lastValueFrom } from 'rxjs';
import { LoanStatus } from '../../../enums/loan-status.enum';

@Component({
  selector: 'app-user-borrowing-history',
  templateUrl: './reader-borrowing-history.component.html',
  styleUrls: [
    './reader-borrowing-history.component.css',
    '../../../../assets/styles/table.css'
  ]
})
export class ReaderBorrowingHistoryComponent implements OnInit {

  public bookBorrowingHistory: Loan[] = [];

  constructor(
    private bookLoanInfoService: BookLoanInfoServiceService
  ) {

  }

  async ngOnInit() {
    const borrowIntime = (await this.getBookBorrowingHistory()) ?? [];
    const borrowOverdue = (await this.getOverdueBorrowing())?.filter(item => {
      return item.status == LoanStatus.BORROWED;
    }) ?? [];
    this.bookBorrowingHistory = [...borrowIntime, ...borrowOverdue];
  }

  // Function to fectch data
  public async getBookBorrowingHistory(): Promise<Loan[]> {
    const username = localStorage.getItem('username') || '';

    if (username) {
      try {
        const res = await lastValueFrom(this.bookLoanInfoService.getBorrowingHistory(username));
        return res.data;
      } catch (err) {
        return [];
      }
    } else {
      return [];
    }
  }

  // Function to fectch data
  public async getOverdueBorrowing(): Promise<Loan[]> {
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
