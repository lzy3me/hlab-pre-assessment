import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "../database/entities/product.entity";
import { Content } from "../database/entities/content.entity";
import { Translation } from "../database/entities/translation.entity";
import { Language } from "../database/entities/language.entity";
import { QueryTypes } from "sequelize";
import { InjectConnection, InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productRepo: typeof Product,
    @InjectModel(Content)
    private contentRepo: typeof Content,
    @InjectModel(Translation)
    private translationRepo: typeof Translation,
    @InjectModel(Language)
    private languageRepo: typeof Language,
    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const txn = await this.sequelize.transaction();
    try {
      const { originLanguage, productName, productDescription, translations } =
        createProductDto;

      const productNameBody = {
        contentText: productName,
        languageId: originLanguage,
      };

      const productDescBody = {
        contentText: productDescription,
        languageId: originLanguage,
      };

      const productNameContent = await this.contentRepo.create(
        productNameBody,
        {
          transaction: txn,
        },
      );
      const productDescContent = await this.contentRepo.create(
        productDescBody,
        {
          transaction: txn,
        },
      );

      const productBody = {
        nameContentId: productNameContent.contentId,
        descriptionContentId: productDescContent.contentId,
      };

      const product = await this.productRepo.create(productBody, {
        transaction: txn,
      });

      await Promise.all(
        translations.map(async (translation) => {
          const translateNameBody = {
            languageId: translation.language,
            translationText: translation.productName,
            contentId: productNameContent.contentId,
          };

          const translateDescBody = {
            languageId: translation.language,
            translationText: translation.productDescription,
            contentId: productDescContent.contentId,
          };

          await this.translationRepo.create(translateNameBody, {
            transaction: txn,
          });
          await this.translationRepo.create(translateDescBody, {
            transaction: txn,
          });
        }),
      );

      await txn.commit();
      return { status: "ok", productId: product.id };
    } catch (error) {
      console.log("An error has occurred : %s", error);
      await txn.rollback();
      throw new HttpException(
        {
          success: false,
          message: new InternalServerErrorException().message,
        },
        error?.http_code || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(name: string, page: number, pageSize: number) {
    try {
      page = Number(page || 1);
      pageSize = Number(pageSize || 20);

      const data = await this.sequelize.query(
        `
    select
      "content->nameProduct"."productId" as "productId",
      "content"."contentText" as "productName",
      "content"."languageId" as "originLanguage",
      "Translation"."translationText" as "translationName",
      "Translation"."languageId" as "translationLanguage"
    from
      "translation" as "Translation"
    left join "content" as "content" on
      "Translation"."contentId" = "content"."contentId"
    inner join "product" as "content->nameProduct" on
      "content"."contentId" = "content->nameProduct"."nameContentId"
    where
      "Translation"."translationText" ilike :name
      or "content"."contentText" ilike :name
    limit :pageSize offset :page
        `,
        {
          type: QueryTypes.SELECT,
          replacements: { name: `%${name}%`, page: page - 1, pageSize },
        },
      );

      return {
        success: true,
        data: data,
        page,
        pageSize,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        { success: false, message: new InternalServerErrorException().message },
        error?.http_code || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
