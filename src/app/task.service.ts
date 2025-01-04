import { Injectable } from '@angular/core';
import { Task } from '../app/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', priority: 'Medium', status: 'In Progress' }
  ];

  getTasks(): Task[] {
    return [...this.tasks];
  }
}
