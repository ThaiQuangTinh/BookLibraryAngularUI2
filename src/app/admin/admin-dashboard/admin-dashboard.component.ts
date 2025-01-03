import { FormAction } from '../../enums/form-action.enum';
import { Component, OnInit } from '@angular/core';
import { FormName } from '../../enums/form-name.enum';
import { UserManagementServiceService } from '../../services/admin/user-management-service.service';
import { User } from '../../models/user.model';
import { Role } from '../../enums/role-enum';
import { FormManagementServiceService } from '../../services/common/form-management-service.service';
import { ToastServiceService } from '../../services/utilities/toast-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  // Varibale to reference to FormName enum
  public FormName = FormName;

  // Variable to share data to admin banner component
  public userRoleStatistics = [
    { role: "Admin", total: 0, percent: 0 },
    { role: "Librarian", total: 0, percent: 0 },
    { role: "Reader", total: 0, percent: 0 },
  ];

  // Varibale contain total of role
  public totalAllRoles: number = 0;

  // Variable to contain data of each role
  public users: User[] = [];

  // Variable to control current tab
  public currentTab: Role = Role.All;

  constructor(
    public formManagementService: FormManagementServiceService,
    private userManagementService: UserManagementServiceService,
    private toastMessageService: ToastServiceService
  ) {

  }

  ngOnInit(): void {
    this.loadUserRoleStatistics();
    this.loadUsers(Role.All);
  }

  // Function to load user by role
  public loadUsers(role: Role): void {
    this.userManagementService.getUsersInfoByRoleName(role, 1, 10).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.error(err.message);
      }
    });
  }

  // Function to change role
  public onTabChange(role: Role): void {
    this.currentTab = role;
    this.loadUsers(role);
  }

  // Function to reload users
  public reloadUsers(): void {
    this.loadUsers(this.currentTab);
    this.loadUserRoleStatistics();
  }

  // Call api and update data for admin banner
  public loadUserRoleStatistics(): void {
    this.userManagementService.getTotalCount().subscribe({
      next: (res) => {
        const data = res.data;
        this.userRoleStatistics = [
          { role: "Admin", total: data.total.adminTotal, percent: data.percent.adminPercent },
          { role: "Librarian", total: data.total.librarianTotal, percent: data.percent.librarianPercent },
          { role: "Reader", total: data.total.readerTotal, percent: data.percent.readerPercent },
        ];

        this.totalAllRoles = data.total.adminTotal + data.total.librarianTotal + data.total.readerTotal;
      }
    });
  }

  // Function to receive data from forms
  public onReceiveDataFromForm(action: FormAction): void {
    this.reloadUsers();

    switch (action) {
      case FormAction.CREATE:
        this.currentTab = Role.All;
        this.toastMessageService.showSuccess('Create successfully!');
        break;
      case FormAction.EDIT:
        this.toastMessageService.showSuccess('Edit successfully!');
        break;
      case FormAction.DELETE:
        this.toastMessageService.showSuccess('Delete successfully!');
        break;
    }
  }

}
