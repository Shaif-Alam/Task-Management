import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-task-dialog',
  templateUrl: './add-edit-task-dialog.component.html',
  styleUrls: ['./add-edit-task-dialog.component.scss'],
})
export class AddEditTaskDialogComponent {
  task = {
    title: '',
    description: '',
    priority: 'Low',
    status: 'Pending',
  };

  priorityOptions = ['Low', 'Medium', 'High'];
  statusOptions = ['Pending', 'In Progress', 'Completed'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditTaskDialogComponent>
  ) {
    if (data) {
      this.task = { ...data };
    }
  }

  closeDialog(): void {
    this.dialogRef.close(); 
  }

  saveTask(): void {
    this.dialogRef.close(this.task);
  }
}
