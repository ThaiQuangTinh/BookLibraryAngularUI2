import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { Book } from '../../../models/book.model';
import { BaseOverlayComponent } from '../../../common/base-overlay/base-overlay.component';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { FormName } from '../../../enums/form-name.enum';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: [
    './edit-book.component.css',
    '../../../../assets/styles/form.css'
  ]
})
export class EditBookComponent extends BaseOverlayComponent implements OnInit {

  editBookForm!: FormGroup;

  bookData!: Book;

  // Variable constain categories
  categories = ['detective', 'science', 'discovery', 'study'];

  constructor(
    private fb: FormBuilder,
    private overlayService: OverlayServiceService,
    private toastService: ToastServiceService,
    private formManagementService: FormManagementServiceService
  ) {
    super();
    this.editBookForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['detective', Validators.required],
      description: ['', Validators.required],
      publishYear: ['', Validators.required],
      publisher: ['', Validators.required],
      image: [null, [Validators.required]],
      author: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.bookData = this.formManagementService.getForm(FormName.LibrarianEditBook).data;
    console.log(this.bookData);
  }


  // Function to close edit book form
  public override closeForm(): void {
      this.formManagementService.closeForm(FormName.LibrarianEditBook);
  }

}
