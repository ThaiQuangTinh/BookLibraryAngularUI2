import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { Book } from '../../../models/book.model';
import { BaseOverlayComponent } from '../../../common/base-overlay/base-overlay.component';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { FormName } from '../../../enums/form-name.enum';
import { CategoryServiceService } from '../../../services/common/category-service.service';
import { Category } from '../../../models/category.model';
import { BookServiceService } from '../../../services/common/book-service.service';
import { BookManagementComponent } from '../book-management/book-management.component';
import { BookManagementServiceService } from '../../../services/librarian/book-management-service.service';
import { FormAction } from '../../../enums/form-action.enum';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: [
    './edit-book.component.css',
    '../../../../assets/styles/form.css',
  ],
})
export class EditBookComponent extends BaseOverlayComponent implements OnInit {

  editBookForm!: FormGroup;

  bookData!: Book;

  // Variable constain categories
  categories: Category[] = [];

  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private overlayService: OverlayServiceService,
    private toastService: ToastServiceService,
    private formManagementService: FormManagementServiceService,
    private categoryService: CategoryServiceService,
    private bookMngService: BookManagementServiceService,
  ) {
    super();
    this.editBookForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      publishYear: ['', Validators.required],
      publisher: ['', Validators.required],
      image: ['', ],
      author: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    this.bookData = this.formManagementService.getForm(
      FormName.LibrarianEditBook
    ).data;
    this.categories = await this.categoryService.getCategories();
    console.log(this.bookData);
    this.editBookForm.setValue({
      title: this.bookData.title,
      category: this.bookData.categoryId,
      description: this.bookData.description,
      publishYear: this.bookData.publishYear.getFullYear(),
      publisher: this.bookData.publisher,
      image: this.bookData.imageUrl,
      author: this.bookData.author,
    });
  }

  // Function to close edit book form
  public override closeForm(): void {
    this.formManagementService.closeForm(FormName.LibrarianEditBook);
  }

  public onImageChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if(files && files[0]) {
      this.imageFile = files[0];
    } else {
      this.imageFile = null;
    }
  }

  public async onEditSubmit() {
    const formData = this.editBookForm.getRawValue();
    this.bookData.title = formData.title;
    this.bookData.categoryId = formData.category;
    this.bookData.description = formData.description;
    this.bookData.publishYear = new Date(`${formData.publishYear}-01-01`);
    this.bookData.publisher = formData.publisher;
    this.bookData.imageUrl = formData.image;
    this.bookData.author = formData.author;

    try {
      await this.bookMngService.editBook(this.bookData, this.imageFile);
      this.dataEvent.emit({action: FormAction.EDIT});
      this.closeForm();
    } catch (error) {
      this.toastService.showError("Edit failed.");
    }
  }
}
