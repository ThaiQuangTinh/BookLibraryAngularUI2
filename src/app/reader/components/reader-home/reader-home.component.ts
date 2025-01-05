import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book.model';
import { BookServiceService } from '../../../services/common/book-service.service';
import { BookFavouriteServiceService } from '../../../services/reader/book-favourite-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';

@Component({
  selector: 'app-reader-home',
  templateUrl: './reader-home.component.html',
  styleUrls: [
    './reader-home.component.css',
    '../../../../assets/styles/table.css'
  ]
})
export class ReaderHomeComponent implements OnInit {

  // Variable to storage books list
  public books: Book[] = [];

  // Variable to storage books count
  public booksCount: number = 0;

  // Variable to storage search query content
  public searchQuery: string = '';

  // Varibale to storage username of user
  public username: string = '';

  // Variable to storage status fav of book
  public favoriteBooks: { [key: string]: boolean } = {};

  constructor(
    private bookService: BookServiceService,
    private bookFavouriteService: BookFavouriteServiceService,
    private toastMessageService: ToastServiceService
  ) {

  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    if (!this.username) {
      this.toastMessageService.showError('Please login into application!');
      return;
    }

    this.fetchBookData();
  }

  // Fetch books data
  public fetchBookData(): void {
    this.bookService.getAllBook()
      .subscribe({
        next: (res) => {
          this.books = res;
          this.booksCount = this.books.length;

          this.books.forEach((book) => {
            this.checkFavorite(book.id);
          })
        },
        error: (err) => {
          console.log(err.message);
        }
      })
  }

  // Function to search book by name
  public searchBook(): void {
    const searchQueryLower = this.searchQuery.toLowerCase();

    if (!searchQueryLower) {
      this.fetchBookData();
    }

    this.books = this.books.filter((book) => {
      return book.title.toLowerCase().includes(searchQueryLower);
    });
  }

  // Function to check favrorite
  public checkFavorite(bookId: string): void {
    this.bookFavouriteService.checkFavorite(this.username, bookId)
      .subscribe({
        next: (res) => {
          this.favoriteBooks[bookId] = res.data.exists;
        },
        error: (err) => {
          console.error(err.message);
          this.favoriteBooks[bookId] = false;
        }
      });
  }


  // Function to toggle favorite
  public toggleFavorite(bookId: string): void {
    if (this.favoriteBooks[bookId]) {
      this.removeFavorite(this.username, bookId);
    } else {
      this.createFavorite(this.username, bookId);
    }
  }

  // Function to create favorite
  public createFavorite(username: string, bookId: string): void {
    this.bookFavouriteService.createFavorite(username, bookId)
      .subscribe({
        next: (res) => {
          this.favoriteBooks[bookId] = true;
        },
        error: (err) => {
          console.error(err.message);
        }
      })
  }

  // Function to remove favorite
  public removeFavorite(username: string, bookId: string): void {
    this.bookFavouriteService.removeFavorite(username, bookId)
      .subscribe({
        next: (res) => {
          this.favoriteBooks[bookId] = false;
        },
        error: (err) => {
          console.error(err.message);
        }
      })
  }


}
