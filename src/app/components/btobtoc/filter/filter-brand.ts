/**
 * Created by wayne on 2017/07/26.
 */
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'brandfilter'
})

export class brandFilterPipe implements PipeTransform {
  transform(value: any[], args: any): any {
    var returnArr = [];
    value.forEach((item)=>{
      if(item['name'].indexOf(args) > -1){
        returnArr.push(item);
      }
    }); 
    return returnArr;   
  }
}
