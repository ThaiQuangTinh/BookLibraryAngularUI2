import { Pipe, PipeTransform } from '@angular/core';
import { LoanStatus } from '../enums/loan-status.enum';

@Pipe({
  name: 'checkOverdueStatus'
})
export class CheclOverdueStatusPipe implements PipeTransform {

  transform(status: number, capitalize: boolean = false): string {
    let label = '';

    if (status === LoanStatus.OVERDUE || status === LoanStatus.BORROWED) {
      label = 'overdue';
    } else {
      label = 'intime'
    }

    if (capitalize) {
      label = label.charAt(0).toUpperCase() + label.slice(1);
    }

    return label;
  }

}
