import { Sequelize } from "sequelize-typescript";
import { Product } from "./entities/product.entity";
import { Content } from "./entities/content.entity";
import { Language } from "./entities/language.entity";

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
        database: "nest",
      });
      sequelize.addModels([Product, Content, Language]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
