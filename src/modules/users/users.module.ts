import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserProviders } from './user.providers';
import { DatabaseModule } from '../../database/database.module';
import { RoleModule } from '../role/role.module';
import { RoleProviders } from '../role/role.providers';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [DatabaseModule],
  providers: [...UserProviders, UsersService, ...RoleProviders],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
