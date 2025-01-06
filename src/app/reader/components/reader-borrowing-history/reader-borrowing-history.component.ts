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

  public borrowIntime: Loan[] = [];

  public borrowOverdue: Loan[] = [];


  constructor(
    private bookLoanInfoService: BookLoanInfoServiceService
  ) {

  }
  /**
   * Lịch sử đã mượn: lấy những lượt mượn đã trả đúng hạn và quá hạn
   * OVERDUE có 2 status: đang mượn và trả quá hạn 
   */

  async ngOnInit() {
    this.borrowIntime = (await this.getBookBorrowingHistory()) ?? [];
    this.borrowOverdue = (await this.getOverdue())?.filter(item => {
      return item.status == LoanStatus.OVERDUE;
    }) ?? [];
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
