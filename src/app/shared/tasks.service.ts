import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, map } from 'rxjs';
export interface Task {
  id?: string;
  title: string;
  date?: string;
}
interface CreateResponse {
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  static url =
    'https://angular-practice-calenda-18004-default-rtdb.europe-west1.firebasedatabase.app/tasks';

  constructor(private http: HttpClient) {}

  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(
        map((response) => {
          return { ...task, id: response.name };
        })
      );
  }

  load(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks) => {
          if (!tasks) return [];
          return Object.keys(tasks).map((key: any) => ({
            ...tasks[key],
            id: key,
          }));
        })
      );
  }
  remove(task: Task){
    return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
  }
}
