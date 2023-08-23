import { Injectable } from '@angular/core';
import { IArrayUtilitiesService } from './iarray-utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayUtilitiesService implements IArrayUtilitiesService{

  constructor() { }

  shuffleArray(array: any[]): any[] {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }

  sameValues(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
    
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }
    return true;
}



}