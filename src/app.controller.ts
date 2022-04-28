import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Healthcheck')
export class AppController {
  @Get()
  getHello(): string {
    return 'Task Management App';
  }
}
