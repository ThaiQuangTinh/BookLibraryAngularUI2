import { FormAction } from '../../enums/form-action.enum';
import { FormName } from './../../enums/form-name.enum';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-base-overlay',
  templateUrl: './base-overlay.component.html',
  styleUrl: './base-overlay.component.css'
})
export class BaseOverlayComponent {

  // Input to recieve data form parent componnent
  @Input() data: any;

  // Output to send data to parent component
  @Output() dataEvent: EventEmitter<any> = new EventEmitter();

  // Function to close form (child component can overide)
  public closeForm(): void {
    
  }

}
