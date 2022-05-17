import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async findAllProductByVisibility(auth = false) {
        if (auth) {
            return this.prisma.products.findMany({
                where: { visible_authenticated: 1 },
            });
        }
        return this.prisma.products.findMany({ where: { visible_public: 1 } });
    }

    async findProductByCategory(categoryId: number, auth = false) {
        if (auth) {
            return this.prisma.products.findMany({
                where: {
                    AND: [
                        { category_id: categoryId },
                        { visible_authenticated: 1 },
                    ],
                },
            });
        }

        return this.prisma.products.findMany({
            where: {
                AND: [{ category_id: categoryId }, { visible_public: 1 }],
            },
        });
    }
}
