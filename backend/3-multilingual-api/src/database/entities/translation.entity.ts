import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Content } from "./content.entity";
import { Language } from "./language.entity";

@Table({
  tableName: "translation",
  freezeTableName: true,
  timestamps: false,
})
export class Translation extends Model {
  @ForeignKey(() => Content)
  @Column({ type: DataType.UUID })
  contentId: string;

  @Column({ type: DataType.TEXT })
  translationText: string;

  @ForeignKey(() => Language)
  @Column({ type: DataType.STRING(2) })
  languageId: string;

  @BelongsTo(() => Content, "contentId")
  content: Content;

  @BelongsTo(() => Language, "languageId")
  language: Language;
}
