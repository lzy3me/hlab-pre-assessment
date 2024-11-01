import { UUIDV4 } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Language } from "./language.entity";
import { Translation } from "./translation.entity";
import { Product } from "./product.entity";

@Table({
  tableName: "content",
  freezeTableName: true,
  timestamps: false,
})
export class Content extends Model {
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, primaryKey: true })
  contentId: string;

  @Column({ type: DataType.TEXT })
  contentText: string;

  @ForeignKey(() => Language)
  @Column({ type: DataType.STRING(2) })
  languageId: string;

  @BelongsTo(() => Language, "languageId")
  language: Language;

  @HasMany(() => Translation, "contentId")
  translations: Translation[];

  @HasOne(() => Product, "nameContentId")
  nameProduct: Product;

  @HasOne(() => Product, "descriptionContentId")
  descProduct: Product;
}
