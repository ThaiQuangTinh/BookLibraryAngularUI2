import { FormName } from './../../../enums/form-name.enum';
import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { Book } from '../../../models/book.model';
import { BookFavouriteServiceService } from '../../../services/reader/book-favourite-service.service';
import { FormAction } from '../../../enums/form-action.enum';

@Component({
  selector: 'app-reader-favrouties',
  templateUrl: './reader-favrouties.component.html',
  styleUrls: [
    './reader-favrouties.component.css',
    '../../../../assets/styles/table.css',
  ]
})
export class ReaderFavroutiesComponent implements OnInit {

  // Variable to reference to FormName
  public FormName = FormName;

  // Variable to storage favorites book
  public favoritesBook: Book[] = [];

  // Variable to storage length of favorites book
  public favoritesBookLength: number = 0;

  // Variable to storage username of user
  public username: string = '';

  public selectedBookIds: string[] = [];

  constructor(
    private toastMessageService: ToastServiceService,
    public formManagementService: FormManagementServiceService,
    private bookFavoriteService: BookFavouriteServiceService
  ) {

  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    this.fetchDataToFavoriteBook();
  }

  // Function to revieve data from delete form
  public onRecieveDataFormDeleteForm(data: any): void {
    this.fetchDataToFavoriteBook();

    if (data.action == FormAction.DELETE) {
      this.toastMessageService.showSuccess('Delete successfully');
    }

  }

  // Function to open form
  public openForm(formName: FormName): void {
    this.formManagementService.openForm(formName);
  }

  // Fetch data favorites book
  public fetchDataToFavoriteBook(): void {
    this.bookFavoriteService.getFavotites(this.username)
      .subscribe({
        next: (res) => {
          this.favoritesBook = res;
          this.favoritesBookLength = this.favoritesBook.length;
        },
        error: (err) => {
          console.error(err.message);
        }
      })
  }

  // Function to select all books
  selectAllBooks(event: any): void {
    if (event.target.checked) {
      this.selectedBookIds = this.favoritesBook.map(book => book.id);
    } else {
      this.selectedBookIds = [];
    }
  }

  // Function to toggle status of checkbox for each book
  onBookSelect(bookId: string, event: any): void {
    if (event.target.checked) {
      this.selectedBookIds.push(bookId);
    } else {
      this.selectedBookIds = this.selectedBookIds.filter(id => id !== bookId);
    }
  }

  //
  isAllSelected(): boolean {
    return this.selectedBookIds.length === this.favoritesBook.length;
  }

  // Function to remove favorite book
  public removeFavoriteBook(bookIds: string | string[]): void {
    this.openForm(FormName.ReaderDeleteFavBookDialog);
    this.formManagementService.setForm(FormName.ReaderDeleteFavBookDialog, bookIds);
  }

  // Function to remove many favorite book
  public removeManyFavBook(): void {
    if (this.selectedBookIds.length == 0) {
      this.toastMessageService.showWarning('Please choose favorite book!');
      return;
    }

    this.removeFavoriteBook(this.selectedBookIds);
  }
}
