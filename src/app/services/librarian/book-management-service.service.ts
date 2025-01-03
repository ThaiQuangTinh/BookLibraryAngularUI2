import { HttpClient, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookManagementServiceService {

  // Define base api url
  private baseApiUrl: string = 'http://localhost:8200/books-command';

  constructor(
    private http: HttpClient
  ) {

  }

  // Service to create  book
  public createBook() {

  }

  // Service to create many book
  public createManyBook() {

  }

  // Service to find book
  public findBook() {

  }

  // Service to edit book
  public editBook() {

  }

  // Service to delete book
  public deleteBook() {

  }

}
