import { Component, OnInit } from '@angular/core';
import { FormManagementServiceService } from '../../services/common/form-management-service.service';
import { FormName } from '../../enums/form-name.enum';

@Component({
  selector: 'app-librarian-dashboard',
  templateUrl: './librarian-dashboard.component.html',
  styleUrl: './librarian-dashboard.component.css'
})
export class LibrarianDashboardComponent implements OnInit {

  public onSideNavChange: boolean = false;

  public FormName = FormName;

  constructor(
    public formManagementService: FormManagementServiceService,
  ) {

  }

  ngOnInit(): void {
      
  }

}
