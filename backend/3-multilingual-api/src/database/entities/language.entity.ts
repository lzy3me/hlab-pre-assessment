import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Content } from "./content.entity";
import { Translation } from "./translation.entity";

@Table({
  tableName: "language",
  freezeTableName: true,
  timestamps: false,
})
export class Language extends Model {
  @Column({ type: DataType.STRING(2), primaryKey: true })
  languageId: string;

  @Column({ type: DataType.STRING(100) })
  languageName: string;

  @Column({ type: DataType.TEXT })
  languageValidate: string;

  @HasMany(() => Content, "languageId")
  contents: Content[];

  @HasMany(() => Translation, "languageId")
  translations: Translation[];
}
