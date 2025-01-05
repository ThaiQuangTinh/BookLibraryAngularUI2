import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loanStatusLabel'
})
export class LoanStatusLabelPipe implements PipeTransform {

  transform(status: number, capitalize: boolean = false): string {
    let label = '';

    switch (status) {
      case 2:
        label = 'intime';
        break;
      default:
        label = 'overdue';
        break;
    }

    if (capitalize) {
      label = label.charAt(0).toUpperCase() + label.slice(1);
    }

    return label;
  }

}
