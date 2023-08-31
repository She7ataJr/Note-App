import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { NoteService } from 'src/app/core/services/note.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public _MateDialog: MatDialog,
    private _NoteService: NoteService,
    private _AuthService: AuthService
  ) {}
  Notes: any[] = [];
  value = '';
  ngOnInit(): void {
    this.getNotes();
  }

  addNote() {
    const MatDialogRef = this._MateDialog.open(NoteDataComponent);
    
    MatDialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res === "NoteAdded"){
          this.getNotes()
        }
      }
    })

  }

  setData(Note:any):void{
    const MatDialogRef= this._MateDialog.open(NoteDataComponent,{
      data:Note
    })
  //  MatDialogRef.afterClosed().subscribe({
  //     next:(res)=>{
  //       if(res === "updated"){
  //         this.getNotes()
  //       }
  //     }
  //   })
  }
  getNotes(): void {
    const data = {
      token: localStorage.getItem('NoteToken'),
      userID: this._AuthService.user.getValue()._id,
    };
    this._NoteService.getNotes(data).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == 'success') {
          this.Notes = res.Notes;
        }
      },
    });
  }
  deleteNote(noteId:string,index:number):void{
    const data = {
      NoteID:noteId,
      token:localStorage.getItem('NoteToken')
    }
   this._NoteService.deleteNote(data).subscribe({
    next:res=>{
      if(res.message=="deleted"){
        this.Notes.splice(index,1)
        this.Notes=[...this.Notes]
      }
      
    }
   })
    
  }
  updateNote(Note:any):void{
    const MatDialogRef= this._MateDialog.open(NoteDataComponent,{
      data:Note
    })
      MatDialogRef.afterClosed().subscribe({
        next:(res)=>{
          if(res === "updated"){
            this.getNotes()
          }
        }
      })
  }
}
