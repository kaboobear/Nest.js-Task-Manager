import { Test } from '@nestjs/testing';
import { TaskStatus } from './enum/task-status.enum';
import { TasksRepository } from './repository/tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'myUsername',
  id: 'myId',
  password: 'myPasswork',
  tasks: [],
};

const mockTask = {
  title: 'title one',
  description: 'description one',
  id: 'myId',
  status: TaskStatus.OPEN,
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  describe('getTasks method', () => {
    it('Should return a result', async () => {
      tasksRepository.getTasks.mockResolvedValue({ ok: true });
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual({ ok: true });
    });
  });

  describe('getTaskById method', () => {
    it('should return result', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('myId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('should return exception', () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('myId', mockUser)).rejects.toThrow(
        `Task with id ${mockTask.id} not found`,
      );
    });
  });
});
