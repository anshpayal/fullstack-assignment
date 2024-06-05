/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PdfService } from './pdf.service';
import { FileService } from './file.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    private readonly pdfService: PdfService,
    private readonly fileService: FileService,
) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }

  @Get('pdf')
  async generatePdf() {
    const users = await this.userService.findAllUsers();
    const pdfBuffer = this.pdfService.generatePdf(users);
    this.fileService.savePdfFile(pdfBuffer);
  }

  @Get('pdf/download')
  async downloadPdf(@Res() res) {
    const pdfBuffer = this.fileService.getPdfFile();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');
    res.send(pdfBuffer);
  }

}