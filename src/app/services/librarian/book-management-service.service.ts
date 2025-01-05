import { HttpClient, HttpHeaders, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { lastValueFrom, Observable } from 'rxjs';
import { BookReturnConfirmDialogComponent } from '../../librarian/components/book-return-confirm-dialog/book-return-confirm-dialog.component';
import { CommonResponse } from '../../models/common-response.model';
import { AuthenServiceService } from '../common/authen-service.service';

@Injectable({
  providedIn: 'root',
})
export class BookManagementServiceService {
  // Define base api url
  private baseApiUrl: string = 'http://localhost:8200/books-command';
  private createNewBookURL: string = 'create';
  private updateBookURL: string = 'update';
  private createManyURL : string = "create-many"

  constructor(
    private http: HttpClient,
    private authenService: AuthenServiceService
  ) {}

  private matchRoute(apiUrl: string) {
    return this.baseApiUrl + '/' + apiUrl;
  }

  private createHeader(): HttpHeaders {
    const token = this.authenService.getToken() || '';

    return new HttpHeaders({
      Authorization: token,
    });
  }

  private handleCreateBook(book: Book, imageFile: File | null | undefined): Observable<CommonResponse<Book>> {
    let formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("publisher", book.publisher);
    formData.append("year", book.publishYear.getFullYear().toString());
    formData.append("categoryIds", JSON.stringify([book.categoryId]));
    formData.append("totalCopies", book.totalCopies.toString());
    formData.append("description", book.description);
    if(imageFile) {
      formData.append("imageFile", imageFile);
    }

    const headers = this.createHeader();
    return this.http.put<CommonResponse<Book>>(
      this.matchRoute(this.createNewBookURL),
      formData,
      {headers: headers}
    );
  }

  private handleEditBook(book: Book, imageFile: File | null | undefined): Observable<CommonResponse<Book>> {
    let formData = new FormData();
    formData.append("id", book.id);
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("publisher", book.publisher);
    formData.append("year", book.publishYear.getFullYear().toString());
    formData.append("categoryIds", JSON.stringify([book.categoryId]));
    formData.append("totalCopies", book.totalCopies.toString());
    formData.append("description", book.description);
    formData.append("currentImageUrl", book.imageUrl);
    if(imageFile) {
      formData.append("imageFile", imageFile);
    }

    const headers = this.createHeader();
    return this.http.put<CommonResponse<Book>>(
      this.matchRoute(this.updateBookURL),
      formData,
      {headers: headers}
    );
  }

  private handelCreateMany(books: Book[]): Observable<CommonResponse<Book[]>>{
    const headers = new HttpHeaders({
      Authorization: this.authenService.getToken() || '',
      'Content-type': 'application/json',
    });
    const body = {
      bookInfos: books.map(book => {
        return {
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          year: book.publishYear.getFullYear(), 
          categoryIds : [book.categoryId], 
          totalCopies: book.totalCopies,
          description: book.description,
        }
      })
    }
    console.log(body);
    return this.http.put<CommonResponse<Book[]>>(this.matchRoute(this.createManyURL), JSON.stringify(body), {headers: headers})
  }

  // Service to create  book
  public async createBook(book: Book, imageFile: File | null | undefined): Promise<Book> {
    const res = await lastValueFrom(this.handleCreateBook(book, imageFile));
    return res.data;
  }

  // Service to create many book
  public async createManyBook(books: Book[]) : Promise<Book[]> {
    const res = await lastValueFrom(this.handelCreateMany(books));
    return res.data;
  }

  // Service to find book
  public findBook() {}

  // Service to edit book
  public async editBook(book : Book, imageFile: File | null | undefined) : Promise<Book> {
    const res = await lastValueFrom(this.handleEditBook(book, imageFile));
    return res.data;
  }

  // Service to delete book
  public deleteBook() {}
}
