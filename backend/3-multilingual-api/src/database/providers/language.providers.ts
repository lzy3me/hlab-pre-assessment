import { Language } from "../entities/language.entity";

export const languageProviders = [
  {
    provide: "LANGUAGE_REPOSITORY",
    useValue: Language,
  },
];
