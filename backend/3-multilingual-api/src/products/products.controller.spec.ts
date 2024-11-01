import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";

describe("ProductsController", () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    // Mock ProductsService with Jest
    const mockProductsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
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
        originLanguage: "en",
        productName: "Sample Product",
        productDescription: "Sample description",
        translations: [
          {
            language: "es",
            productName: "Producto de muestra",
            productDescription: "Descripción de muestra",
          },
        ],
      };
      const result = { id: 1, ...createProductDto };

      // Mock implementation of create method
      (productsService.create as jest.Mock).mockResolvedValue(result);

      expect(await productsController.create(createProductDto)).toEqual(result);
      expect(productsService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe("findAll", () => {
    it("should call productsService.findAll with correct parameters", async () => {
      const query = { name: "Sample", page: 1, pageSize: 10 };
      const result = {
        success: true,
        data: [
          {
            id: 1,
            originLanguage: "en",
            productName: "Sample Product",
            productDescription: "Sample description",
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
  });
});
