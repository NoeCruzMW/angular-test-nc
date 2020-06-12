import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(collection: any[], query:string ): any[] {
    if (!collection || !query) {      
      return collection;
    }
    return collection.filter(anyElement=>{
      return anyElement.name.toLowerCase().includes(query.toLowerCase());
    })
  }


}
