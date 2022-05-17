import { categories } from ".prisma/client";
import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoriesService } from "./categories.service";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: "All found category",
    })
    findAll(): Promise<categories[]> {
        return this.categoriesService.findAll();
    }
}
