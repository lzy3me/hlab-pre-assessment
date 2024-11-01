import { Translation } from "../entities/translation.entity";

export const translationProviders = [
  {
    provide: "TRANSLATION_REPOSITORY",
    useValue: Translation,
  },
];
