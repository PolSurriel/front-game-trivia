import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, excludeItems: any[] = []): any[] {
    if (!items) return [];
    if (!searchText && !excludeItems.length) return items;
    
    searchText = searchText ? searchText.toLowerCase() : '';
    
    return items.filter(it => 
      it.toLowerCase().includes(searchText) && !excludeItems.includes(it)
    );
  }

}
