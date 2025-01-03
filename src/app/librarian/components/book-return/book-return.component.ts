import { Component, OnInit } from '@angular/core';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { FormName } from '../../../enums/form-name.enum';

@Component({
  selector: 'app-book-return',
  templateUrl: './book-return.component.html',
  styleUrls: [
    './book-return.component.css',
    '../../../../assets/styles/table.css'
  ]
})
export class BookReturnComponent implements OnInit {

  public FormName = FormName;

  // Variable contain types to search
  searchTypes = ['author', 'publisher'];

  constructor(
    public formManagementService: FormManagementServiceService
  ) {

  }

  ngOnInit(): void {

  }

  // Functio to show book return confrim dialog
  public showBookReturnConfirmDialog(): void {
    this.formManagementService.openForm(FormName.LibrarianBookReturnConfirmDialog);
  }
}
