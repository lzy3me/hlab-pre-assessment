import { UUIDV4 } from "sequelize";
import { Column, DataType, Model } from "sequelize-typescript";

export class Product extends Model {
  @Column({ type: DataType.UUIDV4, defaultValue: UUIDV4, primaryKey: true })
  productId: string;

  @Column({ type: DataType.UUIDV4 })
  nameContentId: string;

  @Column({ type: DataType.UUIDV4 })
  descriptionContentId: string;
}
