import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './models/task.model.js';

@Injectable()
export class TasksService {
  private allTasks: Task[] = [
    new Task('1', 'Task1', 'todo', 2026, new Date()),
    new Task('2', 'Task2', 'done', 2026, new Date()),
    new Task('3', 'Task3', 'pending', 2026, new Date()),
  ];

  ajouterTask(newTask: any) {
    newTask.id = crypto.randomUUID();
    newTask.createdAt = new Date();
    this.allTasks.push(newTask);
    return this.allTasks;
  }

  chercherTousLesTasks() {
    return this.allTasks;
  }

  chercherTaskParId(id: any) {
    return this.allTasks.find((task) => task.id == id);
  }

  mettreAJourTask(id: any, uTask: any) {
    let i = this.allTasks.findIndex((task) => task.id == id);
    this.allTasks[i] = uTask;
    return this.allTasks;
  }

  statistiques(y1: number, y2: number) {
    return this.allTasks.filter((task) => task.year >= y1 && task.year <= y2);
  }

  supprimerTask(id: any) {
    let i = this.allTasks.findIndex((task) => task.id == id);
    if (i == -1) throw new NotFoundException(`Ce task d'id ${id} n'existe pas`);
    this.allTasks.splice(i, 1);
    return this.allTasks;
  }
}
