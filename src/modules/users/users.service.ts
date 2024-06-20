import {
  ConflictException,
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

import * as bcrypt from 'bcrypt';
import { UserDetails } from './user.details.entity';
import { plainToClass } from 'class-transformer';
import { ReadUserDto } from './dto/read-user.dto';
import { RolesGuard } from '../role/guards/roles.guard';
import { HasRoles } from '../role/roles.decorator';
import {RoleEnum} from  '../role/enums/role.enum';

import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Grupo } from '../grupo/entities/grupo.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
    @Inject('GRUPO_REPOSITORY')
    private grupoRepository: Repository<Grupo>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
   
    const { username, password, name, lastname, email, roles } = createUserDto;
    
    const rolesfound: Role[] = [];
    const userExists = await this.userRepository.findOne({
      where: { username: username, status: Status.ACTIVO },
    });
    if (userExists) {
      throw new ConflictException('username or email already exists');
    }
    for (let index = 0; index < roles.length; index++) {
      const foundRole: Role = await this.roleRepository.findOne({
        where: { name: roles[index] },
      });
      if (foundRole) {
        rolesfound.push(foundRole);
      }
    }
    
    const user = new User();
 
    user.username = username.toLowerCase();
    user.roles = rolesfound;
    const detail = new UserDetails();
    detail.name = name;
    detail.lastname = lastname;
    detail.email = email;

    user.details = detail;
    user.status = Status.ACTIVO;
   

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const result: User = await this.userRepository.save(user);

    return plainToClass(ReadUserDto, result);
  }

  async findAll(): Promise<ReadUserDto[]> {
    const users: User[] = await this.userRepository.find();
   /* const users: User[] = await this.userRepository.find(
      {
      where: { status: Status.ACTIVO },
    });*/
    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  async findOne(username: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ReadUserDto> {
    const rolesfound: Role[] = [];
    for (let index = 0; index < updateUserDto.roles.length; index++) {
      const foundRole: Role = await this.roleRepository.findOne({
        where: { name: updateUserDto.roles[index]},
      });
      if (foundRole) {
        rolesfound.push(foundRole);
      }
    }
    const userExists: User = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!userExists) {
      throw new ConflictException('el usuario no existe');
    }
    const salt = await bcrypt.genSalt(10);
   
    userExists.details.name = updateUserDto.name;
    userExists.details.lastname = updateUserDto.lastname;
    userExists.details.email = updateUserDto.email;
    userExists.roles = rolesfound;
    userExists.status = Status.ACTIVO;
    userExists.updatedAt = new Date();
    if( updateUserDto.password !==""){
       userExists.password = await bcrypt.hash(updateUserDto.password, salt);
    }
   
    const result = await this.userRepository.save(userExists);

    return plainToClass(ReadUserDto, result);
  }

  async remove(id: string): Promise<ReadUserDto> {
    const userExists: User = await this.userRepository.findOne({
      where: { id: id, status: Status.ACTIVO },
    });
    if (!userExists) {
      throw new ConflictException('el usuario no existe');
    }
    userExists.status = Status.INACTIVO;
    await this.userRepository.save(userExists);
    return plainToClass(ReadUserDto, userExists);
  }
  async findAllHoster(): Promise<ReadUserDto[]>{
	 const users: User[] = await this.userRepository
	  .createQueryBuilder('user')
	  .innerJoinAndSelect('user.roles','rol')
	  .where('rol.name = :nameRol',{
		nameRol: RoleEnum.HOSTER  
	  })  .getMany();
	    return users.map((user: User) => plainToClass(ReadUserDto, user));
	  
  }
}
