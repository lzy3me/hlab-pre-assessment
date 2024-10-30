import { Column, DataType, Model } from "sequelize-typescript";

export class Language extends Model {
  @Column({ type: DataType.STRING(2), primaryKey: true })
  languageId: string;

  @Column({ type: DataType.STRING(100) })
  languageName: string;
}
