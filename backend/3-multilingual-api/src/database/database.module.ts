import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./entities/product.entity";
import { Content } from "./entities/content.entity";
import { Translation } from "./entities/translation.entity";
import { Language } from "./entities/language.entity";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: 5432,
      username: "root",
      password: "password",
      database: "hlab",
      models: [Product, Content, Translation, Language],
      synchronize: true,
      logging: true,
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule {}
