import { categories } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<categories[]> {
        return this.prisma.categories.findMany();
    }
}
