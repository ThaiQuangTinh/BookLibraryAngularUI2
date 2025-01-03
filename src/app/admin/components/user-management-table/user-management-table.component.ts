import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../models/user.model';
import { Role } from '../../../enums/role-enum';
import { FormName } from '../../../enums/form-name.enum';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';
import { RoleHeplperServiceService } from '../../../services/common/role-heplper-service.service';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrl: './user-management-table.component.css'
})
export class UserManagementTableComponent implements OnInit {

  // Input to recive data from admin dashboard component
  @Input() totalAllRoles: number = 0;

  @Input() users: User[] = [];

  @Input() currentTab: Role = Role.All;

  // Output to share data to admin dashboard component
  @Output() changeTabEvent: EventEmitter<Role> = new EventEmitter<Role>;

  // Variable refernce to Role Enum
  public Role = Role;

  public FormName = FormName;

  // Variable to contain data of input search
  public searchQuery: string = '';

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
    public roleHelperService: RoleHeplperServiceService
  ) {

  }

  ngOnInit(): void {
    this.buttonTabList[0].isActive = true;
  }

  // Function is call when currentTab modify (Input)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTab']) {
      const previousValue = changes['currentTab'].previousValue;
      const currentValue = changes['currentTab'].currentValue;
      if (previousValue !== currentValue) {
        this.onChangeTab(currentValue); 
      }
    }
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
  }

  // Function to save data to edit user
  public saveDataToEditUserForm(user: User): void {
    this.formManagementService.setForm(FormName.AdminEditUser, user);
  }

  // Function to search user
  public searchUsers(): void {
    const searchQueryLower = this.searchQuery.trim().toLowerCase();
    const currentTabId = this.roleHelperService.getRoleIdByName(this.currentTab);

    if (searchQueryLower === '') {

    }
  }

  // Function to save data to delete user
  public saveDataToDeleteUserForm(usernames: string | string[]): void {
    const usernameArray = Array.isArray(usernames) ? usernames : [usernames];
    this.formManagementService.setForm(FormName.AdminDeleteUserDialog, usernameArray);
  }

}
