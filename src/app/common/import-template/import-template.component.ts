import { User } from '../../models/user.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastServiceService } from '../../services/utilities/toast-service.service';
import { ExcelReaderService } from '../../services/common/excel-reader.service';
import { BaseOverlayComponent } from '../base-overlay/base-overlay.component';
import { FormName } from '../../enums/form-name.enum';
import { FormAction } from '../../enums/form-action.enum';
import { UserManagementServiceService } from '../../services/admin/user-management-service.service';
import { FormManagementServiceService } from '../../services/common/form-management-service.service';
import { Book } from '../../models/book.model';
import { BookManagementComponent } from '../../librarian/components/book-management/book-management.component';
import { BookManagementServiceService } from '../../services/librarian/book-management-service.service';

@Component({
  selector: 'app-import-template',
  templateUrl: './import-template.component.html',
  styleUrl: './import-template.component.css',
})
export class ImportTemplateComponent
  extends BaseOverlayComponent
  implements OnInit
{
  // Variable to storage role id of user
  public roleId: number = 0;

  // Variable contain name of file
  selectedFileName: string = 'No file chosen';

  // Variable contain user information
  users: User[] = [];

  books: Book[] = [];

  constructor(
    private toastMessageService: ToastServiceService,
    private excelReaderService: ExcelReaderService,
    private userManagementService: UserManagementServiceService,
    private formManagementService: FormManagementServiceService,
    private bookmngService: BookManagementServiceService
  ) {
    super();
  }

  ngOnInit(): void {
    this.roleId = +(sessionStorage.getItem('role_id') || 0);
  }

  // Function to close form
  public override closeForm(): void {
    if (this.roleId === 1) {
      this.formManagementService.closeForm(FormName.AdminImportUsers);
    } else if (this.roleId === 2) {
      this.formManagementService.closeForm(FormName.LibrarianImportBooks);
    }
  }

  // Function to check change of input file
  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLocaleLowerCase();

      if (fileExtension === 'xlsx') {
        this.selectedFileName = fileName;
        this.fectchDataFromFile(file);
      } else {
        this.toastMessageService.showWarning('Only .xlsx files are allowed');
        input.value = '';
        this.selectedFileName = 'No file chosen';
      }
    }
  }

  // Function to choose file
  public chooseFile(): void {
    document.getElementById('fileInput')?.click();
  }

  // Function to call service to get data from excel file
  public fectchDataFromFile(file: File): void {
    if (this.roleId === 1) {
      this.excelReaderService
        .readExcelFile(file, ['username', 'email'])
        .then((data) => {
          this.users = this.convertDataToUsers(data);
        })
        .catch((error) => {
          console.error('Error reading Excel file:', error);
        });
    } else {
      this.excelReaderService
        .readExcelFile(file, ['title', 'categoryId', 'description', 'year', 'publisher', 'copies', 'author'])
        .then((data) => {
          this.books = this.convertDataToBooks(data);
          console.log(this.books);
        })
        .catch((error) => {
          console.error('Error reading Excel file:', error);
        });
    }
  }

  // Function to convert object to User
  public convertDataToUsers(objectArr: any[]): User[] {
    let newUser: User[] = [];

    // Convert data to User
    objectArr.forEach((element) => {
      newUser.push(
        new User({
          username: element.username,
          email: element.email,
          fullname: element.fullname,
          roleId: element.roleId,
          phoneNumber: element.phoneNumber,
        })
      );
    });

    return newUser;
  }

  public convertDataToBooks(datas: any[]): Book[] {
    return datas.map(data => new Book({
      title: data.title,
      categoryId: data.categoryId,
      description: data.description, 
      publishYear: new Date(`${data.year}-01-01`),
      publisher: data.publisher,
      totalCopies: data.copies,
      author: data.author,
    }));
  }

  // Function to import users
  public async onImportUserToApp() {
    if (this.roleId === 1) {
      this.importUser();
    } else {
      await this.importBooks();
    }
  }

  private importUser() {
    this.userManagementService.createNewUser(this.users).subscribe({
      next: (res) => {
        this.dataEvent.emit({ action: FormAction.CREATE });
        this.closeForm();
      },
      error: (err) => {
        this.closeForm();
        this.toastMessageService.showError(err.message);
      },
    });
  }

  private async importBooks() {
    try {
      await this.bookmngService.createManyBook(this.books);
      this.dataEvent.emit({ action: FormAction.CREATE });
      this.closeForm();
    } catch (error) {
      this.toastMessageService.showError('Import books fail');
      this.closeForm();
    }
  }
}
