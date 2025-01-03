import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  // Define base api url
  private baseApiUrl: string = 'http://localhost:8200/books';

  constructor(
    private http: HttpClient
  ) { }

  // Function to convert API data to Book array
  private convertToBookArray(data: any[]): Book[] {
    return data.map(item => {
      let firstCategory;
      if (item.categorys) {
        firstCategory = item.categorys.length > 0 ? item.categorys[0] : {};
      }

      return new Book({
        id: item._id,
        title: item.title,
        author: item.author,
        publisher: item.publisher,
        publishYear: new Date(item.year, 0, 1),
        categoryId: firstCategory._id || '',
        categoryName: firstCategory.categoryName || '',
        totalCopies: item.totalCopies,
        description: item.description,
        imageUrl: item.imageUrl.length > 0 ? item.imageUrl[0] : ''
      });
    });
  }

  // Service to get books 
  public getAllBook(): Observable<Book[]> {
    return this.http.get<any>(`${this.baseApiUrl}/getall`)
      .pipe(
        map(response => this.convertToBookArray(response.data))
      );
  }

  // Service to get books base on page and limit 
  public getBookCount(page: number, limit: number): Observable<Book[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.baseApiUrl}/getall`, { params })
      .pipe(
        map(response => this.convertToBookArray(response.data))
      );
  }

  // Service to create new book
  public createBook() {

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

  // Service to return book
  public returnBook() {

  }

  // Service to lending book
  public lendingBook() {
    
  }


}
