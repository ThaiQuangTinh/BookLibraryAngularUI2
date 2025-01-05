import { Host, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookImage',
})
export class BookImagePipe implements PipeTransform {
  transform(value: string | null | undefined, ...args: unknown[]): unknown {
    return BookImagePipe.tranformImgSource(value);
  }

  public static tranformImgSource(value: string | null | undefined) {
    if (value) {
      return 'http://localhost:8200' + value;
    } else {
      return 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1328768386i/6393242.jpg';
    }
  }
}
