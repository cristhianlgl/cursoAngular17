import { Component, computed, signal, OnInit, effect, inject, Injector } from '@angular/core';
import { Task } from '../../models/task.model';
import { FiltersTask } from '../../models/filtersTask.enum';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  listTasks = signal<Task[]>([]);
  filters = FiltersTask;
  filterTask = signal<FiltersTask>(FiltersTask.All);

  listTasksFilter = computed(() => {
    const filter = this.filterTask();
    const tasks = this.listTasks();
    const filterMap: Record<FiltersTask, () => Task[]> = {
      [this.filters.All]: () => tasks,
      [this.filters.Completed]: () => tasks.filter((task) => task.completed),
      [this.filters.Pending]: () => tasks.filter((task) => !task.completed),
    }
    return filterMap[filter]();
  })

  taskControl = new FormControl('',
    {
      nonNullable: true,
      validators: [Validators.required]
    }
  )
  injector = inject(Injector);

  ngOnInit(){
    const tasksStorage = localStorage.getItem('task');
    if(!tasksStorage)
      return
    const tasks = JSON.parse(tasksStorage);
    this.listTasks.set(tasks);
    this.trackTask();
  }

  trackTask(){
    effect(() => {
      const tasks = this.listTasks();
      localStorage.setItem('task', JSON.stringify(tasks));
    }, {injector: this.injector})
  }


  addTaskHandler() {
    const value = this.taskControl.value.trim();
    if (this.taskControl.invalid || value === '')
      return;

    this.addTask(value);
    this.taskControl.setValue('');
  }

  addTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      completed: false
    }
    this.listTasks.update((tasks) => [...tasks, newTask]);
  }

  removeTask(id: string) {
    this.listTasks.update((tasks) => tasks.filter((task) => task.id !== id))
  }

  updateTask(id: string) {
    this.listTasks.update(tasks => tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  updateStateTask(id: string) {
    this.listTasks.update(tasks => tasks.map((task) =>
      task.id === id
        ? { ...task, editing: true }
        : { ...task, editing: false }
    ))
  }

  updateTitleTask(id: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if (value === '')
      return;
    this.listTasks.update(tasks => tasks.map((task) =>
      task.id === id
        ? { ...task, editing: false, title: value }
        : task
    ))
  }

  changeFilter(filter: FiltersTask) {
    this.filterTask.set(filter)
  }

}
