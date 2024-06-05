/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Replace with your MySQL host
      port: 3306, // Replace with your MySQL port
      username: 'root', // Replace with your MySQL username
      password: 'root', // Replace with your MySQL password
      database: 'userdata', // Replace with your desired database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}