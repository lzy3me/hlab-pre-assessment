import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { productProvider } from "src/database/providers/product.providers";
import { contentProviders } from "src/database/providers/content.providers";
import { translationProviders } from "src/database/providers/translation.providers";
import { languageProviders } from "src/database/providers/language.providers";

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ...productProvider,
    ...contentProviders,
    ...translationProviders,
    ...languageProviders,
  ],
})
export class ProductsModule {}
