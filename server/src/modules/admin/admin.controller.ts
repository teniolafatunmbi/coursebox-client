import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('login')
  login(@Body() loginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  @Post('create-lecturer')
  createLecturer(@Body() createDto) {
    return this.adminService.createLecturer(createDto);
  }
}
