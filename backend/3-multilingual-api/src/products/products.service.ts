import { Inject, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "src/database/entities/product.entity";
import { Content } from "src/database/entities/content.entity";
import { Translation } from "src/database/entities/translation.entity";
import { Language } from "src/database/entities/language.entity";
import { Op, Transaction } from "sequelize";

@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCT_REPOSITORY")
    private productRepo: typeof Product,
    @Inject("CONTENT_REPOSITORY")
    private contentRepo: typeof Content,
    @Inject("TRANSLATION_REPOSITORY")
    private translationRepo: typeof Translation,
    @Inject("LANGUAGE_REPOSITORY")
    private languageRepo: typeof Language,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      await this.sequelize.transaction(async (txn: Transaction) => {
        const productNameBody = {
          contentText: createProductDto.productName,
          languageId: createProductDto.originLanguage,
        };

        const productDescBody = {
          contentText: createProductDto.productDescription,
          languageId: createProductDto.originLanguage,
        };

        const productNameContent = this.contentRepo.create(productNameBody, {
          transaction: txn,
        });
        const productDescContent = this.contentRepo.create(productDescBody, {
          transaction: txn,
        });
      });
    } catch (error) {}

    return "This action adds a new product";
  }

  findAll(name: string) {
    try {
      const translations = this.translationRepo.findAll({
        where: { translationText: { [Op.iLike]: name } },
      });

      return translations;
    } catch (error) {
      console.log("An error has occurred : %s", error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
