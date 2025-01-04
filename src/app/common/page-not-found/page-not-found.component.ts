import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationServiceService } from '../../services/common/navigation-service.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

  constructor(
    private router: Router,
    private navigationService: NavigationServiceService
  ) { }
  
  goBack(): void {
    // const previousUrl = this.navigationService.getPreviousUrl();
    // if (previousUrl) {
    //   this.router.navigateByUrl(previousUrl);
    // } else {
    //   this.router.navigate(['/']);
    // }
  }

}
