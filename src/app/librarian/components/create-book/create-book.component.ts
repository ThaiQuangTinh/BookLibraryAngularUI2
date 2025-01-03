import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { UserManagementServiceService } from '../../../services/admin/user-management-service.service';
import { BaseOverlayComponent } from '../../../common/base-overlay/base-overlay.component';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { FormName } from '../../../enums/form-name.enum';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: [
    './create-book.component.css',
    '../../../../assets/styles/form.css'
  ]
})
export class CreateBookComponent extends BaseOverlayComponent {

  createBookForm!: FormGroup;

  // Variables contain category list
  categories = ['detective', 'science', 'entertaining', 'discovery', 'study'];

  constructor(
    private fb: FormBuilder,
    private overlayService: OverlayServiceService,
    private toastService: ToastServiceService,
    private userManagementService: UserManagementServiceService,
    private formManagementService: FormManagementServiceService
  ) {
    super();
    this.createBookForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['detective', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required],
      pulisher: ['', Validators.required],
      totalCopies: [1, [Validators.required]],
      author: ['', [Validators.required]]
    });
  }


  // Function to close create book form
  public override closeForm(): void {
      this.formManagementService.closeForm(FormName.LibrarianCreateBook);
  }

}
