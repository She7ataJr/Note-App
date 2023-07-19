import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  transform(Notes:any[],term:string): any[] {
    return Notes.filter(note =>  note.title.toLowerCase().includes(term.toLowerCase()));
  }

}
