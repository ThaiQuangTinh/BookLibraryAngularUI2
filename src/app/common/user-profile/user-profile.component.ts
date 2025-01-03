import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayServiceService } from '../../services/utilities/overlay-service.service';
import { User } from '../../models/user.model';
import { ToastServiceService } from '../../services/utilities/toast-service.service';
import { UserManagementServiceService } from '../../services/admin/user-management-service.service';
import { BaseOverlayComponent } from '../base-overlay/base-overlay.component';
import { FormName } from '../../enums/form-name.enum';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FormAction } from '../../enums/form-action.enum';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent extends BaseOverlayComponent implements OnInit {

  // Input to recive data from header component
  @Input() user!: User;

  userProfileForm!: FormGroup;

  // Variable to manage to status of edit user profile form
  isEdit: boolean = false;

  // Variable contain name of the photo
  selectedPhotoName: string | null = null;

  // Variale contain photo file (when user is selected)
  selectedPhoto: File | null = null;

  constructor(
    private fb: FormBuilder,
    private overlayService: OverlayServiceService,
    private toastService: ToastServiceService,
    private userManagementService: UserManagementServiceService
  ) {
    super();
    // Initial form
    this.userProfileForm = this.fb.group({
      fullname: [{ value: '', disabled: !this.isEdit }, [Validators.required]],
      email: [{ value: '', disabled: !this.isEdit }, [Validators.required, Validators.email]],
      phoneNumber: [{ value: '', disabled: !this.isEdit }, [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit(): void {
    this.fetchUserInfor();
  }


  // Function to close form
  public override closeForm(): void {
    this.dataEvent.emit({ formName: FormName.UserProfile, action: FormAction.CLOSE });
  }

  // Function to change status of inputs
  onEditHandle(): void {
    this.isEdit = true;
    this.userProfileForm.get('fullname')?.enable();
    this.userProfileForm.get('email')?.enable();
    this.userProfileForm.get('phoneNumber')?.enable();
  }

  // Function to handle when choose a photo
  onChoosePhoto(): void {
    const fileInput = document.getElementById('photoInput') as HTMLElement;
    fileInput.click();
  }

  // Handle when user choose photo
  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      // Check format of image
      if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            const imgElement = document.getElementById('userPhoto') as HTMLImageElement;
            imgElement.src = e.target.result as string;
          }
        };

        reader.readAsDataURL(file);
        this.selectedPhotoName = file.name;
        this.selectedPhoto = file;
      } else {
        this.toastService.showWarning('Only PNG or JPG files are allowed!');
        input.value = '';
        this.selectedPhotoName = null;
        this.selectedPhoto = null;
      }
    }
  }

  // Function to fetch user infromation via request of user (token)
  public fetchUserInfor(): void {
    this.userManagementService.getUserInfoByToken()
      .subscribe({
        next: (res) => {
          this.user = res;
          this.userProfileForm.setValue({
            fullname: this.user.fullname,
            email: this.user.email,
            phoneNumber: this.user.phoneNumber,
          })
        },
        error: (err) => {
          console.error(err.message);
        }
      });
  }

  // Function is called when user click to the save profile button
  onSubMit() {
    if (this.userProfileForm.valid) {
      const newUser = new User({
        ...this.user,
        email: this.userProfileForm.value.email,
        fullname: this.userProfileForm.value.fullname,
        phoneNumber: this.userProfileForm.value.phoneNumber,
      });

      // Update user profile and pass image if selected
      this.userManagementService.updateUserInfo(newUser, this.selectedPhoto)
        .subscribe({
          next: (res) => {
            this.isEdit = false;
            this.dataEvent.emit({formName: FormName.UserProfile, action: FormAction.RELOAD});
            this.toastService.showSuccess('Profile updated successfully');
          },
          error: (err) => {
            this.toastService.showError('Error updating profile');
          }
        })
    }
  }

}
