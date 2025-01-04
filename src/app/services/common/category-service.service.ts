import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  // Define base api url
  private baseApiUrl: string = 'http://localhost:8200/book-categories';

  constructor(
    private http: HttpClient
  ) { }

  // Service to get categories
  public getPopularCategories(count: number = 3): Observable<any> {
    const params = new HttpParams().set('limit', count);
    return this.http.get(`${this.baseApiUrl}/get-large-amount-category`, { params });
  }

}
