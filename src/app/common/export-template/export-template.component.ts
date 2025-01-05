import { FormManagementServiceService } from '../../services/common/form-management-service.service';
import { HttpClient } from '@angular/common/http';
import { OverlayServiceService } from '../../services/utilities/overlay-service.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { BaseOverlayComponent } from '../base-overlay/base-overlay.component';
import { FormName } from '../../enums/form-name.enum';
import { FormAction } from '../../enums/form-action.enum';
import { ExportExcelTemplateService } from '../../services/common/export-excel-template.service';

@Component({
  selector: 'app-export-template',
  templateUrl: './export-template.component.html',
  styleUrl: './export-template.component.css'
})
export class ExportTemplateComponent extends BaseOverlayComponent implements OnInit {

  // Variable contain id of user (admin: 1, librarian: 2, reader: 3)
  public roleId!: number;

  constructor(
    private exportExcelTemplateService: ExportExcelTemplateService,
    private formManagementService: FormManagementServiceService
  ) {
    super();
  }

  ngOnInit(): void {
    this.roleId = +(localStorage.getItem('role_id') || 0);
  }

  // Function to close form
  public override closeForm(): void {
    if (this.roleId === 1) {
      this.formManagementService.closeForm(FormName.AdminExportUserTemplate);
    } else if (this.roleId === 2) {
      this.formManagementService.closeForm(FormName.LibrarianExportBookTemplate);
    }
  }

  // Function to download template base on role
  public downloadTemplate(): void {
    let field = null;

    if (this.roleId === 1) {
      field = ['username', 'email', 'fullname', 'roleId', 'phoneNumber'];
      this.exportExcelTemplateService.exportTemplate(field, 'User_Template.xlsx');
    } else if (this.roleId === 2) {
      field = ['title', 'categoryId', 'description', 'year', 'publisher', 'copies', 'author'];
      this.exportExcelTemplateService.exportTemplate(field, 'Book_Template.xlsx');
    }

    this.closeForm();
  }

}
