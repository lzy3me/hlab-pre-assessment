import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query("name") name: string,
    @Query("page") page: number,
    @Query("pageSize") pageSize: number,
  ) {
    return await this.productsService.findAll(name, page, pageSize);
  }
}
