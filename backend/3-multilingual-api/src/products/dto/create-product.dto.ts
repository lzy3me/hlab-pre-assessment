export class CreateProductDto {
  originLanguage: string;
  productName: string;
  productDescription: string;
  translations?: {
    language: string;
    productName: string;
    productDescription: string;
  }[];
}
