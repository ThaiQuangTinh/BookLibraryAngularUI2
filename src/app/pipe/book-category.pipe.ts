import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category.model';

@Pipe({
  name: 'bookCategory'
})
export class BookCategoryPipe implements PipeTransform {

  transform(value: Category[] | null | undefined, ...args: unknown[]): unknown {
    return BookCategoryPipe.transformCategory(value);
  }

  public static transformCategory(value: Category[] | null | undefined){
    if(value && value.length > 0) {
      return value[0].categoryName;
    } else {
      return "Nah";
    }
  }
}
