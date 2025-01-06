import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeImage'
})
export class SafeImagePipe implements PipeTransform {

  transform(value: string, type: number): string {
    // Type = 1 is user
    if (type == 1) {
      if (value) {
        return `http://localhost:8100${value}`; 
      } else {
        return 'user.png';
      }
    }

    // Type = 2 is book
    if (type == 2) {
      if (value) {
        return `http://localhost:8200${value}`; 
      } else {
        return 'book.png';
      }
    }

    return '';
  }

}
