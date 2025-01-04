import { Component, OnInit } from '@angular/core';
import { BookLoanInfoServiceService } from '../../../services/reader/book-loan-info-service.service';

@Component({
  selector: 'app-user-borrowing-history',
  templateUrl: './reader-borrowing-history.component.html',
  styleUrls: [
    './reader-borrowing-history.component.css',
    '../../../../assets/styles/table.css'
  ]
})
export class ReaderBorrowingHistoryComponent implements OnInit {

  public bookBorrowingHistory: any[] = [
    { imageUrl: '', bookName: 'Conan', loanDate: '20/11/2025', dueDate: '20/12/2025', returnDate: '30/12/2025', fine: 0 },
    { imageUrl: '', bookName: 'Conan', loanDate: '20/11/2025', dueDate: '20/12/2025', returnDate: '30/12/2025', fine: 0 },
    { imageUrl: '', bookName: 'Conan', loanDate: '20/11/2025', dueDate: '20/12/2025', returnDate: '30/12/2025', fine: 0 },
  ]

  constructor(
    private bookLoanInfoService: BookLoanInfoServiceService
  ) {

  }

  ngOnInit(): void {

  }

  // Function to fectch data
  public fetchBookBorrowingHistory(): void {
    const username = sessionStorage.getItem('username') || '';

    if (username) {
      this.bookLoanInfoService.getBorrowingHistory(username)
        .subscribe({
          next: (res) => {

          },
          error: (err) => {
            console.error(err.message);
          }
        })
    }
  }

}
