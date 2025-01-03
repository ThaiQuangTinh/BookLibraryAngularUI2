import { Component } from '@angular/core';
import { BaseOverlayComponent } from '../../../common/base-overlay/base-overlay.component';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { FormName } from '../../../enums/form-name.enum';

@Component({
  selector: 'app-book-return-confirm-dialog',
  templateUrl: './book-return-confirm-dialog.component.html',
  styleUrl: './book-return-confirm-dialog.component.css'
})
export class BookReturnConfirmDialogComponent extends BaseOverlayComponent{

  constructor(
    private formManagementService: FormManagementServiceService
  ) {
    super();
  }

  // Function to close bool return confirm dialog
  public override closeForm(): void {
      this.formManagementService.closeForm(FormName.LibrarianBookReturnConfirmDialog);
  }

}
