import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommonModule } from "./common/common.module";
import { AuthMiddleware } from "src/common/middleware/auth.middleware";
import { AuthModule } from "src/auth/auth.module";
import { PrismaService } from "src/prisma.service";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { PublicModule } from "./public/public.module";
import { AuthService } from "src/auth/auth.service";

@Module({
    imports: [
        AuthModule,
        CommonModule,
        CategoriesModule,
        ProductsModule,
        PublicModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService, AuthService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: "v1/auth/login", method: RequestMethod.POST },
                { path: "v1/categories", method: RequestMethod.GET },
                "v1/public/(.*)"
            )
            .forRoutes("*");
    }
}
