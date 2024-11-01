import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "src/database/entities/product.entity";
import { Content } from "src/database/entities/content.entity";
import { Language } from "src/database/entities/language.entity";
import { Translation } from "src/database/entities/translation.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Content, Language, Translation]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
