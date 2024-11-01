import { Sequelize } from "sequelize-typescript";
import { Product } from "./entities/product.entity";
import { Content } from "./entities/content.entity";
import { Language } from "./entities/language.entity";
import { Translation } from "./entities/translation.entity";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "postgres",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "password",
        database: "hlab",
      });
      sequelize.addModels([Product, Content, Language, Translation]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
