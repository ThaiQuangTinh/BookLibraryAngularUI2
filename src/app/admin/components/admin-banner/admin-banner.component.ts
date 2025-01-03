import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-banner',
  templateUrl: './admin-banner.component.html',
  styleUrl: './admin-banner.component.css'
})
export class AdminBannerComponent {

  // Input to recieve data from admin dashboard component
  @Input() userRoleStatistics: any[] = [];

  constructor() {

  }

}
