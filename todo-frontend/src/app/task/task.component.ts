import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  newTask:Task = {description:"", completed: false};
  tasks:Task[] = [];
  editingTask:Task|null = null;
  updatedTask: Task = {description:"", completed: false};

  ngOnInit(): void {
    this.getAllTasks();
  }

  createTask():void{
    this.taskService.createTask(this.newTask).subscribe((createdTask) => {
      this.newTask = {description:"", completed: false}; //reset task
      this.tasks.push(createdTask);
    })
  }

  getAllTasks() {
      this.taskService.getAllTasks().subscribe((tasks) => {
          this.tasks = tasks
      })
  }

  editTask(task: Task) {
    this.editingTask = task;
    this.updatedTask = {...task};// Create a copy for editing
  }

  updateTask():void{
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask.id!, this.updatedTask)
      .subscribe((result) => {
          const index = this.tasks.findIndex((task) => task.id == this.editingTask!.id)
          if (index !== -1) {
            this.tasks[index] = result;
            //close edit
            this.cancelEdit()
          }
        })
    }
  }

  cancelEdit() {
    this.editingTask = null;
    this.updatedTask = {description:"", completed: false};
  }

  deleteTask(taskId: any) {
    if(confirm('Are you sure want to delete?'))
      this.taskService.deleteTask(taskId)
      .subscribe(() => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId)
          if (this.editingTask && this.editingTask.id == taskId) {
              this.cancelEdit();
          }
      })
  }
}
