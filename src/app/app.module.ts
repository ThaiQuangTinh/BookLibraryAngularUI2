import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { ForgotPassowrdComponent } from './common/forgot-passowrd/forgot-passowrd.component';
import { ResetPasswordComponent } from './common/reset-password/reset-password.component';
import { HeaderComponent } from './common/header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CreateNewUserComponent } from './admin/components/create-new-user/create-new-user.component';
import { EditUserComponent } from './admin/components/edit-user/edit-user.component';
import { UserProfileComponent } from './common/user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ImportTemplateComponent } from './common/import-template/import-template.component';
import { ExportTemplateComponent } from './common/export-template/export-template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { VerifyAccountComponent } from './common/verify-account/verify-account.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReaderDashboardComponent } from './reader/reader-dashboard/reader-dashboard.component';
import { ReaderHomeComponent } from './reader/components/reader-home/reader-home.component';
import { ReaderFavroutiesComponent } from './reader/components/reader-favrouties/reader-favrouties.component';
import { ReaderBorrowingHistoryComponent } from './reader/components/reader-borrowing-history/reader-borrowing-history.component';
import { ReaderCurrentBorrowedComponent } from './reader/components/reader-current-borrowed/reader-current-borrowed.component';
import { LeftMenuComponent } from './common/left-menu/left-menu.component';
import { MatListModule } from '@angular/material/list';
import { BannerForReaderComponent } from './reader/components/banner-for-reader/banner-for-reader.component';
import { LibrarianDashboardComponent } from './librarian/librarian-dashboard/librarian-dashboard.component';
import { BookManagementComponent } from './librarian/components/book-management/book-management.component';
import { BookLendingComponent } from './librarian/components/book-lending/book-lending.component';
import { BookReturnComponent } from './librarian/components/book-return/book-return.component';
import { ReportComponent } from './librarian/components/report/report.component';
import { CreateBookComponent } from './librarian/components/create-book/create-book.component';
import { EditBookComponent } from './librarian/components/edit-book/edit-book.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { DecimalPrecisionPipe } from './pipes/decimal-precision.pipe';
import { SafeImagePipe } from './pipes/safe-image.pipe';
import { DeleteDialogComponent } from './common/delete-dialog/delete-dialog.component';
import { AdminBannerComponent } from './admin/components/admin-banner/admin-banner.component';
import { UserManagementTableComponent } from './admin/components/user-management-table/user-management-table.component';
import { ItemManagementActionsComponent } from './common/item-management-actions/item-management-actions.component';
import { BaseOverlayComponent } from './common/base-overlay/base-overlay.component';
import { BookReturnConfirmDialogComponent } from './librarian/components/book-return-confirm-dialog/book-return-confirm-dialog.component';
import { BookImagePipe } from './pipes/book-image.pipe';
import { BookCategoryPipe } from './pipes/book-category.pipe';
import { PageNotFoundComponent } from '././common/page-not-found/page-not-found.component';
import { LoanStatusLabelPipe } from './pipes/loan-status-label.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPassowrdComponent,
    ResetPasswordComponent,
    HeaderComponent,
    CreateNewUserComponent,
    EditUserComponent,
    UserProfileComponent,
    AdminDashboardComponent,
    ImportTemplateComponent,
    ExportTemplateComponent,
    VerifyAccountComponent,
    SpinnerComponent,
    ReaderDashboardComponent,
    ReaderHomeComponent,
    ReaderFavroutiesComponent,
    ReaderBorrowingHistoryComponent,
    ReaderCurrentBorrowedComponent,
    LeftMenuComponent,
    BannerForReaderComponent,
    LibrarianDashboardComponent,
    BookManagementComponent,
    BookLendingComponent,
    BookReturnComponent,
    ReportComponent,
    CreateBookComponent,
    EditBookComponent,
    DateFormatPipe,
    DecimalPrecisionPipe,
    SafeImagePipe,
    DeleteDialogComponent,
    AdminBannerComponent,
    UserManagementTableComponent,
    ItemManagementActionsComponent,
    BaseOverlayComponent,
    BookReturnConfirmDialogComponent,
    BookImagePipe,
    BookCategoryPipe,
    PageNotFoundComponent,
    LoanStatusLabelPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
    }),
    OverlayModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    HttpClientModule,
    MatListModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: 'OVERLAY_DATA', useValue: { message: 'Default message', diameter: 40 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
