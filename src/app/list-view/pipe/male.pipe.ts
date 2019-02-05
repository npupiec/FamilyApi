import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'maleCounter'})

export class MalePipe implements PipeTransform {
  transform(value: any): any {
      let male = value.filter(kid => kid.gender === 'male').length;
      return male;
  }
}
