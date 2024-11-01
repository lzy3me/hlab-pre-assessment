import { UUIDV4 } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Content } from "./content.entity";

@Table({
  tableName: "product",
  freezeTableName: true,
  timestamps: false,
})
export class Product extends Model {
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, primaryKey: true })
  productId: string;

  @ForeignKey(() => Content)
  @Column({ type: DataType.UUID })
  nameContentId: string;

  @ForeignKey(() => Content)
  @Column({ type: DataType.UUID })
  descriptionContentId: string;

  @BelongsTo(() => Content, "nameContentId")
  nameContent: Content;

  @BelongsTo(() => Content, "descriptionContentId")
  descriptionContent: Content;
}
