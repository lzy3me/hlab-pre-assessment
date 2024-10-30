import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Db } from './db/db/db';
import { Db } from './db/db';
import { Database } from './database/database';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, Db, Database],
})
export class AppModule {}
