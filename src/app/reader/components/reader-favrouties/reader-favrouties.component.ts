import { FormName } from './../../../enums/form-name.enum';
import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from '../../../services/utilities/toast-service.service';
import { ConfirmationDialogService } from '../../../services/utilities/confirmation-dialog.service';
import { FormManagementServiceService } from '../../../services/common/form-management-service.service';

@Component({
  selector: 'app-reader-favrouties',
  templateUrl: './reader-favrouties.component.html',
  styleUrls: [
    './reader-favrouties.component.css',
    '../../../../assets/styles/table.css',
  ]
})
export class ReaderFavroutiesComponent implements OnInit {

  // Variable to reference to FormName
  public FormName = FormName;

  constructor(
    private toastMessageService: ToastServiceService,
    private confirmDialogService: ConfirmationDialogService,
    public formManagementService: FormManagementServiceService
  ) {

  }

  ngOnInit(): void {

  }

  // Function to open form
  public openForm(formName: FormName): void {
    this.formManagementService.openForm(formName);
  }

}
