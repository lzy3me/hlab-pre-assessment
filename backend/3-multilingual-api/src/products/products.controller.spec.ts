import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { HttpException, InternalServerErrorException } from "@nestjs/common";

describe("ProductsController", () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    // Mock ProductsService with Jest
    const mockProductsService = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe("create", () => {
    it("should call productsService.create with correct parameters", async () => {
      const createProductDto: CreateProductDto = {
        originLanguage: "th",
        productName: "ผลิตภัณฑ์ตัวอย่าง",
        productDescription: "ตัวอย่างคำอธิบาย",
        translations: [
          {
            language: "en",
            productName: "Sample Product",
            productDescription: "Sample Description",
          },
        ],
      };
      const result = { id: 1, ...createProductDto };

      // Mock implementation of create method
      (productsService.create as jest.Mock).mockResolvedValue(result);

      expect(await productsController.create(createProductDto)).toEqual(result);
      expect(productsService.create).toHaveBeenCalledWith(createProductDto);
    });

    it("should throw an HttpException if productsService.create fails", async () => {
      const createProductDto: CreateProductDto = {
        originLanguage: "th",
        productName: "ผลิตภัณฑ์ตัวอย่าง",
        productDescription: "ตัวอย่างคำอธิบาย",
        translations: [],
      };

      // Simulate an error in productsService.create
      const error = new InternalServerErrorException("Error creating product");
      (productsService.create as jest.Mock).mockRejectedValue(error);

      await expect(productsController.create(createProductDto)).rejects.toThrow(
        HttpException,
      );
      await expect(productsController.create(createProductDto)).rejects.toThrow(
        "Error creating product",
      );
    });
  });

  describe("findAll", () => {
    it("should call productsService.findAll with correct parameters", async () => {
      const query = { name: "Sample", page: 1, pageSize: 10 };
      const result = {
        success: true,
        data: [
          {
            productId: 1,
            originLanguage: "th",
            productName: "ผลิตภัณฑ์ตัวอย่าง",
            translationName: "Sample Product",
            translationLanguage: "en",
          },
        ],
        page: 1,
        pageSize: 20,
        total: 1,
      };

      // Mock implementation of findAll method
      (productsService.findAll as jest.Mock).mockResolvedValue(result);

      expect(
        await productsController.findAll(
          query.name,
          query.page,
          query.pageSize,
        ),
      ).toEqual(result);
      expect(productsService.findAll).toHaveBeenCalledWith(
        query.name,
        query.page,
        query.pageSize,
      );
    });

    it("should throw an HttpException if productsService.findAll fails", async () => {
      const query = { name: "Sample", page: 1, pageSize: 10 };

      // Simulate an error in productsService.findAll
      const error = new InternalServerErrorException("Error fetching products");
      (productsService.findAll as jest.Mock).mockRejectedValue(error);

      await expect(
        productsController.findAll(query.name, query.page, query.pageSize),
      ).rejects.toThrow(HttpException);
      await expect(
        productsController.findAll(query.name, query.page, query.pageSize),
      ).rejects.toThrow("Error fetching products");
    });
  });
});
