import { Module } from "@nestjs/common";
import { PublicController } from "./public.controller";
import { ProductsService } from "src/products/products.service";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [PublicController],
    providers: [ProductsService, PrismaService],
})
export class PublicModule {}
