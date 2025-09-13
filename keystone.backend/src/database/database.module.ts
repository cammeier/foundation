import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDatabaseConfig } from '../database.config';
import { List } from '../lists/entities/list.entity';
import { ListItem } from '../lists/entities/list-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...createDatabaseConfig(configService),
        entities: [List, ListItem],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([List, ListItem]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
