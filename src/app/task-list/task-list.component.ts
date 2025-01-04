import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { AddEditTaskDialogComponent } from '../add-edit-task-dialog/add-edit-task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'priority', 'status', 'actions'];
  statusOptions: string[] = ['Pending', 'In Progress', 'Completed'];
  selectedStatus: string = '';

  constructor(private taskService: TaskService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = [...this.tasks];
  }

  filterTasks() {
    if (this.selectedStatus) {
      this.filteredTasks = this.tasks.filter(task => task.status === this.selectedStatus);
    } else {
      this.filteredTasks = [...this.tasks]; 
    }
  }

  openAddTaskModal() {
    const dialogRef = this.dialog.open(AddEditTaskDialogComponent, { data: null });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      
        this.tasks.push(result);
       
        this.filterTasks();
        this.snackBar.open('Task added successfully!', 'Close', { duration: 2000 });
      }
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(AddEditTaskDialogComponent, { data: task });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = result;
          this.filterTasks(); 
          this.snackBar.open('Task updated successfully!', 'Close', { duration: 2000 });
        }
      }
    });
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.filterTasks(); 
      this.snackBar.open('Task deleted successfully!', 'Close', { duration: 2000 });
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Pending':
        return 'status-pending';
      case 'In Progress':
        return 'status-in-progress';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  }
  
  
}