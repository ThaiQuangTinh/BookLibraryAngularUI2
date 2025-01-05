import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormName } from '../../enums/form-name.enum';
import { FormManagementServiceService } from '../../services/common/form-management-service.service';

@Component({
  selector: 'app-item-management-actions',
  templateUrl: './item-management-actions.component.html',
  styleUrl: './item-management-actions.component.css'
})
export class ItemManagementActionsComponent implements OnInit {

  // Variable reference to FormName Enum
  public FormName = FormName;

  public roleId: number = 0;

  constructor(
    public formManagementService: FormManagementServiceService
  ) {

  }

  ngOnInit(): void {
    this.roleId = +(localStorage.getItem('role_id') || 0);
  }

  // Function to open form by name
  public openFormByName(formName: FormName): void {
    this.formManagementService.openForm(formName);
  }

}
