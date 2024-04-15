import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.respository';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
   constructor(private readonly usersRepository: UsersRepository) {}
   private async validateCreateUserDto(createUserDto: CreateUserDto){
      try {
         await this.usersRepository.findOne({email: createUserDto.email});
      } catch(error){
         return 
      }
      throw new UnprocessableEntityException('Email already exist.');
   }

   async create (createUserDto: CreateUserDto) {
      await this.validateCreateUserDto(createUserDto);
      return this.usersRepository.create({
         ...createUserDto,
         password: await bcrypt.hash(createUserDto.password, 10),
      });
   }

   async verifyUser(email:string, password:string){
      const user = await this.usersRepository.findOne({email});
      const passwordIsValid = await bcrypt.compareSync(password, user.password);
      if(!passwordIsValid){
         throw new UnauthorizedException('Credentials are not valid.');
      } 
      return user;
   }

   async getUser (getUserDto: GetUserDto) {
      return this.usersRepository.findOne(getUserDto);
   }
}
