/**
 * Created by wayne on 2017/07/26.
 */
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'filter'
})

export class filterPipe implements PipeTransform {
  transform(value: any[], args: number): any {
    // var returnData;
    // val.filter(val => val['groupId'] = args).map(
    //   value =>  returnData = value
    // )
    //
    // return returnData;
    for(let i = 0; i <= value.length; i++) {
      if(value[i]['groupId']){
        if(value[i]['groupId'] == args) {
          return value[i].countryList;
        }
      }
    }
  }
}
