/**
 * Created by wayne on 2017/07/26.
 */
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'filter'
})

export class filterPipe implements PipeTransform {
  transform(value: any[], args: number): any {
    for(let i = 0; i <= value.length; i++) {
      if(value[i]){
        if(value[i]['groupId'] == args) {
          return value[i].countryList;
        }
      }
    }
  }
}
