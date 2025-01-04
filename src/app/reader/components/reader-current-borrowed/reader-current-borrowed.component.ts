import { Component } from '@angular/core';
import { BookLoanInfoServiceService } from '../../../services/reader/book-loan-info-service.service';

@Component({
  selector: 'app-reader-current-borrowed',
  templateUrl: './reader-current-borrowed.component.html',
  styleUrls: [
    './reader-current-borrowed.component.css',
    '../../../../assets/styles/table.css'
  ]
})
export class ReaderCurrentBorrowedComponent {

  public bookCurrentBorrowed: any[] = [
      { imageUrl: '', bookName: 'Conan', loanDate: '20/11/2025', dueDate: '20/12/2025', status: 'ok', fine: 0 },
      { imageUrl: '', bookName: 'Conan', loanDate: '20/11/2025', dueDate: '20/12/2025', status: 'ok', fine: 0 },
      { imageUrl: '', bookName: 'Conan', loanDate: '20/11/2025', dueDate: '20/12/2025', status: 'ok', fine: 0 },
    ]
  
    constructor(
      private bookLoanInfoService: BookLoanInfoServiceService
    ) {
  
    }
  
    ngOnInit(): void {
  
    }
  
    // Function to fectch data
    public fetchBookCurrentBorrowed(): void {
      const username = sessionStorage.getItem('username') || '';
  
      if (username) {
        this.bookLoanInfoService.getCurrentBorrowed(username)
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
