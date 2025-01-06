import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { ConfirmationDialogService } from '../../../services/utilities/confirmation-dialog.service';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { ExportTemplateComponent } from '../../../common/export-template/export-template.component';
import { Book } from '../../../models/book.model';
import { BookServiceService } from '../../../services/common/book-service.service';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { FormName } from '../../../enums/form-name.enum';
import { FormAction } from '../../../enums/form-action.enum';
import { lastValueFrom } from 'rxjs';
import { SearchDebounceServiceService } from '../../../services/common/search-debounce-service.service';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: [
    './book-management.component.css',
    '../../../../assets/styles/table.css',
  ],
})
export class BookManagementComponent implements OnInit {
  public FormName = FormName;

  // Variable to storage book list
  public books: Book[] = [];

  private searchDebounce!: (bookName: string) => void;

  constructor(
    private toastService: ToastServiceService,
    private confirmDialogService: ConfirmationDialogService,
    private overlayService: OverlayServiceService,
    private bookService: BookServiceService,
    public formManagementService: FormManagementServiceService,
    private searchDebounceService: SearchDebounceServiceService
  ) { }

  async ngOnInit() {
    await this.fetchBooks();
    this.initializeSearchDebounce();
  }

  // Function to fetch book
  private async fetchBooks() {
    this.books = await lastValueFrom(this.bookService.getAllBook());
  }

  // Function to show edit book form
  public showEditBookForm(book: Book): void {
    this.formManagementService.openForm(FormName.LibrarianEditBook);
    this.formManagementService.setForm(FormName.LibrarianEditBook, book);
  }

  async onReceiveDataFromForm(event: any) {
    let action = event.action;
    await this.fetchBooks();
    switch (action) {
      case FormAction.CREATE:
        this.toastService.showSuccess('Books are created successfuly');
        break;
      case FormAction.EDIT:
        this.toastService.showSuccess('Books are editted successfuly');
        break;
    }
  }

  public onSearchBookName(event: Event) {
    const bookName = (event.target as HTMLInputElement).value;
    this.searchDebounce(bookName);
  }

  private initializeSearchDebounce(): void {
    this.searchDebounce = this.searchDebounceService.debounce(async (bookName: string) => {
      await this.fetchBooks();
      if (bookName && bookName !== '') {
        this.books = this.books.filter((book) =>
          book.title.toLowerCase().includes(bookName.toLowerCase())
        );
      }
      console.log(this.books);
    }, 1000);
  }


}
