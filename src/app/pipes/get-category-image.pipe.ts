import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCategoryImage'
})
export class GetCategoryImagePipe implements PipeTransform {

  transform(categoryName: string): string {
    let categoryImgaeUrl = 'image-for-categories/';

    console.log(categoryName);

    switch (categoryName) {
      case 'Fantasy': {
        categoryImgaeUrl += 'Fantasy.jpg';
        break;
      }
      case 'Historical fiction': {
        categoryImgaeUrl += 'HistoricalFiction.jpg';
        break;
      }
      case 'Thriller': {
        categoryImgaeUrl += 'Thriller.jpg';
        break;
      }
      case 'Romance': {
        categoryImgaeUrl += 'Romance.jpg';
        break;
      }
      case 'Self-help': {
        categoryImgaeUrl += 'Self-help.jpg';
        break;
      }
      case 'Memoir, autobiography, and biography': {
        categoryImgaeUrl += 'Memoir, autobiography, and biography.jpg';
        break;
      }
      case 'Science': {
        categoryImgaeUrl += 'Science.jpg';
        break;
      }
      case 'Math': {
        categoryImgaeUrl += 'Math.jpg';
        break;
      }
    }

    return categoryImgaeUrl;
  }

}
