import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  listTasks = signal<Task[]>(
    [
      {
        id: crypto.randomUUID(),
        title: 'task1',
        completed: false
      }
    ]
  );

  taskControl = new FormControl(
    ['', [Validators.required, Validators.minLength(3)]]
  )

  addTaskHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.addTask(input.value);
    input.value = '';
  }

  addTask(title:string){
    const newTask:Task = {
      id: crypto.randomUUID(),
      title: title,
      completed: false 
    }
    this.listTasks.update((tasks) => [...tasks, newTask]);
  }

  removeTask(index:number){
    this.listTasks.update((tasks) => tasks.filter((_,i) => i !== index))
  }

  updateTask(indexTask:number){
    this.listTasks.update(tasks => tasks.map((task,index) => 
       index === indexTask 
         ? {...task, completed: !task.completed }
         : task
    ))
  }
}
