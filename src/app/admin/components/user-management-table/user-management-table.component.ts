import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';
import { Role } from '../../../enums/role-enum';
import { FormName } from '../../../enums/form-name.enum';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { RoleHeplperServiceService } from '../../../services/common/role-heplper-service.service';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { SearchDebounceServiceService } from '../../../services/common/search-debounce-service.service';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrl: './user-management-table.component.css'
})
export class UserManagementTableComponent implements OnInit {

  // Variable refernce to Role Enum
  public Role = Role;

  public FormName = FormName;

  // Input to recive data from admin dashboard component
  @Input() totalAllRoles: number = 0;

  @Input() users: User[] = [];

  @Input() currentTab: Role = Role.All;

  // Output to share data to admin dashboard component
  @Output() changeTabEvent: EventEmitter<Role> = new EventEmitter<Role>;

  // Variable to contain data of input search
  public searchQuery: string = '';

  private searchDebounce!: (fulname: string) => void;

  // ViewChild to reference the "All" checkbox
  @ViewChild('checkboxAll') checkboxAll: ElementRef | undefined;

  // Variable to contain usernames list, that is used to delete User
  public usernamesForDelete: string[] = [];

  // Variable contain button tab list (for table)
  public buttonTabList = [
    { roleName: Role.All, id: 'btnViewAll', isActive: false },
    { roleName: Role.Admin, id: 'btnViewAdmin', isActive: false },
    { roleName: Role.Librarian, id: 'btnViewLibrarian', isActive: false },
    { roleName: Role.Reader, id: 'btnViewReader', isActive: false },
  ];

  constructor(
    public formManagementService: FormManagementServiceService,
    public roleHelperService: RoleHeplperServiceService,
    private toastMessageService: ToastServiceService,
    private searchDebounceService: SearchDebounceServiceService
  ) {

  }

  ngOnInit(): void {
    this.buttonTabList[0].isActive = true;
    this.initializeSearchDebounce();
  }

  // Function to open form
  public openForm(formName: FormName): void {
    this.formManagementService.openForm(formName);
  }


  // Function to change tab
  public onChangeTab(role: Role): void {
    for (let item of this.buttonTabList) {
      if (item.roleName == role) {
        item.isActive = true;
        this.currentTab = role;
        this.changeTabEvent.emit(role);
      } else {
        item.isActive = false;
      }
    }

    // Uncheck "All" checkbox when tab changes
    if (this.checkboxAll) {
      this.checkboxAll.nativeElement.checked = false;
    }

    // Reset all user checkboxes and selected usernames
    this.users.forEach(user => (user.isChecked = false));
    this.usernamesForDelete = [];
  }

  // Function to search user
  public searchUsers(): void {
    const searchQueryLower = this.searchQuery.trim().toLowerCase();

    if (!searchQueryLower) {
      this.changeTabEvent.emit(this.currentTab);
    }

    this.searchDebounce(searchQueryLower);
  }

  private initializeSearchDebounce(): void {
    this.searchDebounce = this.searchDebounceService.debounce(async (searchQueryLower: string) => {
      this.users = this.users.filter(user => {
        const matchesRole = this.currentTab === Role.All
          || user.roleId === this.roleHelperService.getRoleIdByName(this.currentTab);
        const matchesQuery = user.fullname.toLowerCase().includes(searchQueryLower);
        return matchesRole && matchesQuery;
      });
    }, 500);
  }

  // Function to select many checkboxes
  public toggleSelectAll(target: any): void {
    const isChecked = target.checked;

    this.users.forEach(user => {
      user.isChecked = isChecked;

      if (isChecked && !this.usernamesForDelete.includes(user.username)) {
        this.usernamesForDelete.push(user.username);
      } else if (!isChecked) {
        this.usernamesForDelete = this.usernamesForDelete.filter(username =>
          username !== user.username
        );
      }
    });
  }

  // Function to select single checkbox
  public toggleSelectSingle(user: User): void {
    if (user.isChecked) {
      if (!this.usernamesForDelete.includes(user.username)) {
        this.usernamesForDelete.push(user.username);
      }
    } else {
      this.usernamesForDelete = this.usernamesForDelete.filter(username =>
        user.username !== username
      );
    }
  }

  // Function to save data to edit user
  public saveDataToEditUserForm(user: User): void {
    this.openForm(FormName.AdminEditUser);
    this.formManagementService.setForm(FormName.AdminEditUser, user);
  }

  // Function to save data to delete user
  public saveDataToDeleteUserForm(usernames: string | string[]): void {
    this.openForm(FormName.AdminDeleteUserDialog);
    const usernameArray = Array.isArray(usernames) ? usernames : [usernames];
    this.formManagementService.setForm(FormName.AdminDeleteUserDialog, usernameArray);
  }

  // Function to delete multi users
  public deletMultiUsers(): void {
    const isSelectedUser = this.users.every(user => !user.isChecked);
    if (isSelectedUser) {
      this.toastMessageService.showWarning('Please choose user to delete!');
      return;
    }

    // If user is selected
    this.saveDataToDeleteUserForm(this.usernamesForDelete);
  }

}
