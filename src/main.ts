import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as basicAuth from "express-basic-auth";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./common/logger/winston.logger";
import { AllExceptionsFilter } from "./common/errors/error.handling";
import { join } from "path";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });

    app.enableCors({
      origin: [
        "http://localhost:3000", 
        "http://localhost:8080", 
        "https://Modo.com:443",
      ],
      credentials: true,
    });

    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.setGlobalPrefix("api");

   
    const staticPath = join(__dirname, "..", "uploads");
    app.useStaticAssets(staticPath, {
      prefix: "/uploads/",
    });

    app.use(
      ["/docs"],
      basicAuth({
        users: { Mark: "Hallo" },
        challenge: true,
      })
    );

    const config = new DocumentBuilder()
      .setTitle("Modo")
      .setDescription("Plan your day and be productive✅")
      .setVersion("1.0")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        "access-token"
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    await app.listen(PORT, () => {
      console.log(` Server started at http://localhost:${PORT} 🔥`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
