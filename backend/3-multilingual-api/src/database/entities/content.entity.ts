import { UUIDV4 } from "sequelize";
import { Column, DataType, Model } from "sequelize-typescript";

export class Content extends Model {
  @Column({ type: DataType.UUIDV4, defaultValue: UUIDV4, primaryKey: true })
  contentId: string;

  @Column({ type: DataType.TEXT })
  contentText: string;

  @Column({ type: DataType.STRING(2) })
  languageId: string;
}
