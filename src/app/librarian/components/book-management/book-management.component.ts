import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { ConfirmationDialogService } from '../../../services/utilities/confirmation-dialog.service';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { ExportTemplateComponent } from '../../../common/export-template/export-template.component';
import { Book } from '../../../models/book.model';
import { BookServiceService } from '../../../services/common/book-service.service';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { FormName } from '../../../enums/form-name.enum';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: [
    './book-management.component.css',
    '../../../../assets/styles/table.css'
  ]
})
export class BookManagementComponent implements OnInit {

  public FormName = FormName;

  // Variable to storage book list
  public books: Book[] = [];

  constructor(
    private toastService: ToastServiceService,
    private confirmDialogService: ConfirmationDialogService,
    private overlayService: OverlayServiceService,
    private bookService: BookServiceService,
    public formManagementService: FormManagementServiceService
  ) {

  }

  ngOnInit(): void {
    this.fetchBooks();
  }

  // Function to fetch book
  private fetchBooks(): void {
    this.bookService.getBookCount(1, 10)
      .subscribe({
        next: (res) => {
          this.books = res;
        },
        error: (err) => {
          console.log(err.message);
        }
      });
  }

  // Function to show edit book form
  public showEditBookForm(book: Book): void {
    this.formManagementService.openForm(FormName.LibrarianEditBook);
    this.formManagementService.setForm(FormName.LibrarianEditBook, book);
  }

}
