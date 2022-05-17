import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { PrismaService } from "src/prisma.service";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Prismae DB connection
    const dbService: PrismaService = app.get(PrismaService);
    dbService.enableShutdownHooks(app);

    // Global versioning
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
    });

    // Swagger documentation
    const config = new DocumentBuilder().setVersion("1.0").build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(2000);
}
bootstrap();
