import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/entity/user.entity';
import { GetUser } from '../auth/ decorator/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './entity/task.entity';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('Tasks Controller');

  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating a new tasks. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ) {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
