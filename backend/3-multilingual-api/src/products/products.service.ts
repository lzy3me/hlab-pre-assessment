import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "src/database/entities/product.entity";
import { Content } from "src/database/entities/content.entity";
import { Translation } from "src/database/entities/translation.entity";
import { Language } from "src/database/entities/language.entity";
import { Op } from "sequelize";
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

      const { count, rows } = await this.translationRepo.findAndCountAll({
        where: { translationText: { [Op.iLike]: `%${name}%` } },
        include: [
          {
            model: this.contentRepo,
            required: false,
            foreignKey: "contentId",
            where: { contentText: { [Op.iLike]: `%${name}%` } },
            include: [
              {
                model: this.productRepo,
                as: "nameProduct",
                foreignKey: "nameContentId",
              },
            ],
          },
        ],
      });
      // const { count, rows } = await this.translationRepo.findAndCountAll({
      //   where: { translationText: { [Op.iLike]: `%${name}%` } },
      //   limit: pageSize,
      //   offset: (page - 1) * pageSize,
      // });

      return {
        success: true,
        data: rows,
        page,
        pageSize,
        total: count,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        { success: false, message: new InternalServerErrorException().message },
        error?.http_code || HttpStatus.BAD_REQUEST,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
