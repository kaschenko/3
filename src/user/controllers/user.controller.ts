import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly filterService: UserService) {}

  @Get('list')
  getFilteredUsers(@Query() queryParams) {
    return this.filterService.getFilteredUsers({
      query: queryParams.query.toLowerCase(),
    });
  }
}
