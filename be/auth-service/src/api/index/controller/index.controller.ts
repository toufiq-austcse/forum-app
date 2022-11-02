import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Index')
export class IndexController {

  @Get()
  index() {
    return {
      app: 'Nest Boilerplate is running...'
    };
  }
}