import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from '../../../services/common/category-service.service';

@Component({
  selector: 'app-banner-for-reader',
  templateUrl: './banner-for-reader.component.html',
  styleUrl: './banner-for-reader.component.css'
})
export class BannerForReaderComponent implements OnInit {

  public popularCategories: any = [
    { categoryName: 'A', bookCount: 10, imageUrl: '' }
  ]

  constructor(
    private categoryService: CategoryServiceService
  ) {

  }

  ngOnInit(): void {
    this.fetchPopularCategories();
  }

  // Function to fetch popular categories
  public fetchPopularCategories(): void {
    this.categoryService.getPopularCategories()
    .subscribe({
      next: (res) => {
        console.log(res)
        this.popularCategories = res.data.map((element: any) => {
          return { categoryName: element.categoryName, bookCount: element.books, imageUrl: element.imageUrl };
        });
        console.log(this.popularCategories);
      }
    });
  }
}
