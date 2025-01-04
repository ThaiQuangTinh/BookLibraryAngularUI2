import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { CommonResponse } from '../../models/common-response.model';
import { Category } from '../../models/category.model';
import { AuthenServiceService } from './authen-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private baseApiUrl = "http://localhost:8200/";
  private getAll = "book-categories/get-all";

  constructor(
    private httpClient: HttpClient,
    private authenService: AuthenServiceService,
  ) { }

  private createHeader(): HttpHeaders {
    const token = this.authenService.getToken() || '';

    return new HttpHeaders({
      'Authorization': token
    });
  }

  private matchRoute(apiUrl: string) : string {
    return this.baseApiUrl + apiUrl;
  }

  private handleGetCategories() : Observable<CommonResponse<Category[]>> {
    const headers = this.createHeader();
    return this.httpClient.get<CommonResponse<Category[]>>(this.matchRoute(this.getAll), {headers: headers});
  }

  // Service to get categories
  public async getCategories() : Promise<Category[]> {
    const response = await lastValueFrom(this.handleGetCategories());
    return response.data;
  }

}
