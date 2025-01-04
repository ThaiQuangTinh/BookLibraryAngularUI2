import { Component, OnInit } from '@angular/core';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { FormName } from '../../../enums/form-name.enum';
import { Loan } from '../../../models/loan.model';
import { AuthenServiceService } from '../../../services/common/authen-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { LoanManagementServiceService } from '../../../services/librarian/loan-management-service.service';
import { LoanStatus } from '../../../enums/loan-status.enum';

@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
  styleUrls: [
    './book-return.component.css',
    '../../../../assets/styles/table.css',
  ],
})
export class BookReturnComponent implements OnInit {
  public FormName = FormName;

  // Variable contain types to search
  searchTypes = ['author', 'publisher'];

  loans: Loan[] = [];

  returnedIndex = 0;

  constructor(
    public formManagementService: FormManagementServiceService,
    private authenService: AuthenServiceService,
    private toastrService: ToastServiceService,
    private loanService: LoanManagementServiceService
  ) {}

  async ngOnInit() {
    this.loans = await this.loanService.getOverDueAll();
    this.loans = this.loans.filter((loan) => loan.status == LoanStatus.BORROWED);
    this.loans = [...(await this.loanService.getBorrowedAll()), ...this.loans];
    console.log(this.loans);
  }

  // Functio to show book return confrim dialog
  public showBookReturnConfirmDialog(index: number): void {
    this.returnedIndex = index;
    this.formManagementService.openForm(
      FormName.LibrarianBookReturnConfirmDialog
    );
  }

  public async returnBook() {
    const copyId = this.loans[this.returnedIndex].book._id;
    try {
      await this.loanService.returnBook(copyId);
      this.toastrService.showSuccess("Return book successfull");
      this.loans.splice(this.returnedIndex,1);
      this.returnedIndex = 0;
    } catch (error) {
      this.toastrService.showSuccess("Book is returned fail");
    }
  }
}
