import { products } from ".prisma/client";
import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ProductsService } from "./products.service";

@ApiTags("products")
@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @ApiOkResponse({
        status: 200,
        description: "All products for authenticate user",
        isArray: true,
    })
    findAll(): Promise<products[]> {
        return this.productsService.findAllProductByVisibility(true);
    }

    @Get(":categoryId")
    @ApiOkResponse({
        status: 200,
        description: "Find products by category",
        isArray: true,
    })
    findByCategory(
        @Param("categoryId", ParseIntPipe) categoryId: number
    ): Promise<products[]> {
        return this.productsService.findProductByCategory(categoryId, true);
    }
}
