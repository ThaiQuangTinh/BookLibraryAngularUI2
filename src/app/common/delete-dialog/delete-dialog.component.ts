import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastServiceService } from '../../services/utilities/toast-service.service';
import { UserManagementServiceService } from '../../services/admin/user-management-service.service';
import { BaseOverlayComponent } from '../base-overlay/base-overlay.component';
import { FormName } from '../../enums/form-name.enum';
import { FormAction } from '../../enums/form-action.enum';
import { FormManagementServiceService } from '../../services/common/form-management-service.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent extends BaseOverlayComponent implements OnInit {

  // Varibale contains usernames for delete
  usernames: string[] = [];

  constructor(
    private userManagementService: UserManagementServiceService,
    private toastService: ToastServiceService,
    private formManagementService: FormManagementServiceService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.usernames = this.formManagementService.getForm(FormName.AdminDeleteUserDialog).data;
  }

  public onSubmit(): void {
    this.deleteUser();
  }

  // Function to deleteUser
  public deleteUser(): void {
    this.userManagementService.deleteUser(this.usernames)
      .subscribe({
        next: (res) => {
          this.dataEvent.emit({ action: FormAction.DELETE });
          this.closeForm();
        },
        error: (err) => {
          this.toastService.showError(err.message);
        }
      });
  }

  // Function to close this form
  public override closeForm(): void {
    this.formManagementService.closeForm(FormName.AdminDeleteUserDialog);
  }

}
