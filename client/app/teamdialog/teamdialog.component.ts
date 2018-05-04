import { Component, OnInit, Input, Inject } from '@angular/core';
import { User } from '../shared/models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-teamdialog',
  templateUrl: './teamdialog.component.html',
  styleUrls: ['./teamdialog.component.css'],
})
export class TeamdialogComponent implements OnInit {
  isLoading = true;
  constructor(
    public dialogRef: MatDialogRef<TeamdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }


}
