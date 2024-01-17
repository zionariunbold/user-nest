import { Module } from '@nestjs/common';
import { User } from './users/user.entity'
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/report.entity';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Report],
    synchronize: true,
  }), 
  UsersModule, 
  ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
