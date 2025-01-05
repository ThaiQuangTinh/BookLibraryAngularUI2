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

  constructor(
    private bookLoanInfoService: BookLoanInfoServiceService
  ) {

  }

  async ngOnInit() {
    const returnIntime = (await this.getBookBorrowingHistory()) ?? [];
    const returnOverdue = (await this.getOverdueBorrowing())?.filter(item => {
      return item.status == LoanStatus.RETURNED;
    }) ?? [];
    
    this.bookCurrentBorrowed = [...returnIntime, ...returnOverdue];
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
