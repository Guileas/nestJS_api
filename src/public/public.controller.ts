import { products } from ".prisma/client";
import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductsService } from "src/products/products.service";

@ApiTags("public")
@Controller("public")
export class PublicController {
    constructor(private readonly productsService: ProductsService) {}

    @Get("products")
    @ApiResponse({
        status: 200,
        description: "All public products",
        isArray: true,
    })
    findPublicProducts(): Promise<products[]> {
        return this.productsService.findAllProductByVisibility(false);
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
        return this.productsService.findProductByCategory(categoryId, false);
    }
}
