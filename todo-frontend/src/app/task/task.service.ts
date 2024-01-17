import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:8080/api/tasks";

  constructor(private httpClient: HttpClient) { }

  createTask(newTask: Task):Observable<Task>{
     return this.httpClient.post<Task>(this.apiUrl, newTask);
  }

  getAllTasks():Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl);
  }

  updateTask(taskId: number, updatedTask:Task):Observable<Task> {
     return this.httpClient.put<Task>(this.apiUrl+'/'+taskId, updatedTask)
  }

  deleteTask(taskId: number){
    return this.httpClient.delete(this.apiUrl+'/'+taskId);
  }


}
