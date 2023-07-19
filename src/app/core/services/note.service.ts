import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) { }
  getNotes(data:object):Observable<any>{
    return this._HttpClient.post(environment.baseUrl+'getUserNotes',data)
  }
  addNote(data:object):Observable<any>{
    return this._HttpClient.post(environment.baseUrl+'addNote',data)
  }
  updateNote(data:object):Observable<any>{
    return this._HttpClient.put(environment.baseUrl+'updateNote',data)
  }
  deleteNote(data:object):Observable<any>{
    const model={
      body:data
    }
    return this._HttpClient.delete(environment.baseUrl+'deleteNote',model)
  }
}
