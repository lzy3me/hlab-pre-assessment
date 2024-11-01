import { Product } from "../entities/product.entity";

export const productProvider = [
  {
    provide: "PRODUCT_REPOSITORY",
    useValue: Product,
  },
];
