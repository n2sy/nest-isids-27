import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Task } from './models/task.model.js';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  @Inject(TasksService) taskSer: TasksService;

  @Post('add')
  addNewTask(@Body() corps: any) {
    let res = this.taskSer.ajouterTask(corps);
    return { message: 'Task added successfully', tasks: res };
  }
  @Post('v2')
  addNewTaskV2(
    @Body('title') titre: any,
    @Body('status') sta: any,
    @Body('year') annee: any,
  ) {
    console.log(titre, sta, annee);
  }

  @Get()
  getAllTasks() {
    const res = this.taskSer.chercherTousLesTasks();
    return { tasks: res };
  }

  @Get('stats')
  getTaskBetweenTwoYears(
    @Query('year1', ParseIntPipe) y1: number,
    @Query('year2', ParseIntPipe) y2: number,
  ) {
    const res = this.taskSer.statistiques(y1, y2);
    return { tasks: res };
  }

  @Get('search/:taskId')
  getTaskById(@Param('taskId') taskId: any) {
    const res = this.taskSer.chercherTaskParId(taskId);
    return {
      message: 'Task Founded',
      tasks: res,
    };
  }

  @Put(':taskId')
  updateTask(@Param('taskId') taskId: any, @Body() updatedTask: any) {
    const res = this.taskSer.mettreAJourTask(taskId, updatedTask);
    return {
      message: 'Task updated',
      tasks: res,
    };
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: any) {
    const res = this.taskSer.supprimerTask(taskId);
    return {
      message: 'Task deleted',
      tasks: res,
    };
  }
}
