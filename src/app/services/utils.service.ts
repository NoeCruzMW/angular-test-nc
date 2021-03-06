import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  constructor(private datePipe: DatePipe) {}

  transformDate(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }
}
