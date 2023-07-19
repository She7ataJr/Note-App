import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.css']
})
export class NoteDataComponent implements OnInit {
  constructor(private _fb:FormBuilder,
              private _NoteService:NoteService,
              private _MateDialogRef:MatDialogRef<NoteDataComponent>,
              @Inject (MAT_DIALOG_DATA)public data:any){}
  NoteForm!:FormGroup
  userData:any
  ngOnInit(): void {
    this.CreateNote()
    this.userData = jwtDecode(localStorage.getItem('NoteToken')!)
    
  }
  CreateNote():void{
    this.NoteForm=this._fb.group({
      title:[this.data?this.data.title:"",[Validators.required]],
      desc:[this.data?this.data.desc:"",[Validators.required]],
      token:localStorage.getItem('NoteToken')
    })
  }
  sendData():void{
    if(this.NoteForm.valid){
    console.log(this.NoteForm.value);
    if(this.data === null){
      this.addNote()
    }else{
      this.updateNote()
    }

    }
  }
  addNote():void{
    const data ={
      ...this.NoteForm.value,
      citizenID:this.userData._id
    }
    console.log(data);
    
    this._NoteService.addNote(data).subscribe({
      next:(res)=>{
        if(res.message === 'success'){
          this._MateDialogRef.close("NoteAdded");
        }
      }
    })
  }
  updateNote():void{
    const model ={
     ...this.NoteForm.value,
      NoteID:this.data._id,
      token:localStorage.getItem('NoteToken')
    }
    this._NoteService.updateNote(model).subscribe({
      next:res=>{
        console.log(res);
        if(res.message == "updated"){
          this._MateDialogRef.close("updated")
          
        }
      }
    })
  }
}
