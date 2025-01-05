import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeImage'
})
export class SafeImagePipe implements PipeTransform {

  transform(value: string, defaultImage: string = 'assets/book.png'): string {
    return value || defaultImage;
  }

}
