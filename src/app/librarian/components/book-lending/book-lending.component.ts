import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { Router } from '@angular/router';
import { AuthenServiceService } from '../../../services/common/authen-service.service';
import { SpinnerComponent } from '../../../common/spinner/spinner.component';
import { LoanManagementServiceService } from '../../../services/librarian/loan-management-service.service';

@Component({
  selector: 'app-book-lending',
  templateUrl: './book-lending.component.html',
  styleUrls: [
    './book-lending.component.css',
    '../../../../assets/styles/form.css',
  ],
})
export class BookLendingComponent {
  bookLendingForm!: FormGroup;

  passwordVisible: boolean = false;

  loginError: string | null = null;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastServiceService,
    private router: Router,
    private overlayService: OverlayServiceService,
    private authenService: AuthenServiceService,
    private loanService: LoanManagementServiceService,
  ) {
    this.bookLendingForm = this.fb.group({
      usercode: [``, [Validators.required]],
      bookCopyCode: [``, [Validators.required, Validators.minLength(7)]],
    });
  }

  public async onLendingSubmit() {
    const formData = this.bookLendingForm.getRawValue();
    const usercode = formData.usercode??"";
    const bookCopyCode = formData.bookCopyCode??"";
    try {
      await this.loanService.lenddingBook(usercode, bookCopyCode);
      this.toastService.showSuccess("Lendding book successfull.");
      this.bookLendingForm.reset();
    } catch (error) {
      this.toastService.showError("Book copy is not available.");
    }
  }
}
