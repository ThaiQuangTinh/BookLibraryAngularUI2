import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookFavouriteServiceService {

  // Define base api url
  private baseApiUrl: string = `${environment.bookService}/favorite`;

  constructor(
    private http: HttpClient
  ) { }

  // Function to convert API data to Book array
  private convertToBookArray(data: any[]): Book[] {
    return data.map(item => {
      let firstCategory;
      if (item.book.categorys) {
        firstCategory = item.book.categorys.length > 0 ? item.book.categorys[0] : {};
      }

      return new Book({
        id: item.book._id,
        title: item.book.title,
        author: item.book.author,
        publisher: item.book.publisher,
        publishYear: new Date(item.book.year, 0, 1),
        categoryId: firstCategory._id || '',
        categoryName: firstCategory.categoryName || '',
        totalCopies: item.book.totalCopies,
        description: item.book.description,
        imageUrl: item.book.imageUrl.length > 0 ? item.book.imageUrl[0] : ''
      });
    });
  }

  // Service to get favorite by username
  public getFavotites(username: string): Observable<Book[]> {
    return this.http.post(`${this.baseApiUrl}/post-get-favorites`,
      { username }
    ).pipe(
      map((response: any) => this.convertToBookArray(response.data))
    );
  }

  // Service to check favorite with usernae of user and id of book
  public checkFavorite(username: string, bookId: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/post-check-favorite`,
      { username, bookId }
    );
  }

  // Service to create favorite
  public createFavorite(username: string, bookId: string): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/post-set-as-favorite`,
      { username, bookId }
    );
  }

  // Service to remove favorite
  public removeFavorite(username: string, bookIds: string | string[]): Observable<any> {
    const bookIdArray = Array.isArray(bookIds) ? bookIds : [bookIds];

    return this.http.post(`${this.baseApiUrl}/post-remove-favorite`,
      {
        username: username,
        bookIds: bookIdArray
      }
    );
  }

}
