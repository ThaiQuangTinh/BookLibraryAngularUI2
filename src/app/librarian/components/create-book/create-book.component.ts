import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayServiceService } from '../../../services/utilities/overlay-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { UserManagementServiceService } from '../../../services/admin/user-management-service.service';
import { BaseOverlayComponent } from '../../../common/base-overlay/base-overlay.component';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { FormName } from '../../../enums/form-name.enum';
import { CategoryServiceService } from '../../../services/common/category-service.service';
import { Category } from '../../../models/category.model';
import { BookManagementServiceService } from '../../../services/librarian/book-management-service.service';
import { Book } from '../../../models/book.model';
import { FormAction } from '../../../enums/form-action.enum';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: [
    './create-book.component.css',
    '../../../../assets/styles/form.css',
  ],
})
export class CreateBookComponent
  extends BaseOverlayComponent
  implements OnInit
{
  createBookForm!: FormGroup;

  // Variables contain category list
  categories: Category[] = [];
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private overlayService: OverlayServiceService,
    private toastService: ToastServiceService,
    private userManagementService: UserManagementServiceService,
    private formManagementService: FormManagementServiceService,
    private categoryService: CategoryServiceService,
    private bookService: BookManagementServiceService
  ) {
    super();
    this.createBookForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required],
      pulisher: ['', Validators.required],
      totalCopies: [1, [Validators.required]],
      author: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    this.categories = await this.categoryService.getCategories();
    this.createBookForm.get('category')?.setValue(this.categories[0]._id);
  }

  // Function to close create book form
  public override closeForm(): void {
    this.formManagementService.closeForm(FormName.LibrarianCreateBook);
  }

  public async createNewBook() {
    const formData = this.createBookForm.getRawValue();
    const book = new Book(
      {
        title: formData.title,
        author: formData.author,
        publisher: formData.pulisher,
        publishYear: new Date(`${formData.year}-01-01`),
        categoryId: formData.category,
        totalCopies: formData.totalCopies,
        description: formData.description,
      }
    );
    const bookRes = await this.bookService.createBook(book, this.imageFile);
    this.dataEvent.emit({action: FormAction.CREATE});
    this.closeForm();
  }

  public onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if(files && files[0]) {
      this.imageFile = files[0];
    } else {
      this.imageFile = null;
    }
  }
}
