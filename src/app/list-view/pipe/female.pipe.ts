import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'femaleCounter'})

export class FemalePipe implements PipeTransform {
  transform(value: any): any {
    let female = value.filter(kid => kid.gender === 'female').length;
    return female;
  }
}