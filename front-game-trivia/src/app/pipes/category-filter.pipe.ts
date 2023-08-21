import { Pipe, PipeTransform } from '@angular/core';

// Decorator that marks a class as an Angular pipe and supplies configuration metadata.
@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  // The transform method is a requirement when implementing the PipeTransform interface.
  // It defines how the pipe transforms the input value into the desired output.
  transform(items: any[], searchText: string, excludeItems: any[] = []): any[] {
    // If there are no items, return an empty array.
    if (!items) return [];

    // If there's no searchText and no items to exclude, return the items as is.
    if (!searchText && !excludeItems.length) return items;

    // Convert the search text to lowercase (for case-insensitive search).
    searchText = searchText ? searchText.toLowerCase() : '';

    // Return a new array containing only items that:
    // - contain the search text
    // - are not included in the excludeItems array
    return items.filter(it => 
      it.toLowerCase().includes(searchText) && !excludeItems.includes(it)
    );
  }
}
