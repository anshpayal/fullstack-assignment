/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, user: User): Promise<User> {
    console.log('Updating user with ID:', id);
    const existingUser = await this.findUserById(id);
    console.log('Existing user:', existingUser);
    if (!existingUser) {
    // User not found
      console.log('User not found');
      return null;
    }

    // Update only the properties that are present in the user object
    Object.keys(user).forEach(key => {
      if (user[key] !== undefined && user[key] !== null) {
        existingUser[key] = user[key];
      }
    });
    console.log('Updated user:', existingUser);

    return this.userRepository.save(existingUser);
  }

  async deleteUser(id: number): Promise<boolean> {
    const existingUser = await this.findUserById(id);
    if (!existingUser) {
      // User not found
      return false;
    }
    await this.userRepository.delete(id);
    return true;
  }
}