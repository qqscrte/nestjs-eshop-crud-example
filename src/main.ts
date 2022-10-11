import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function start() {
    const PORT = process.env.PORT;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('E-shop')
        .setDescription('REST API documentation')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/documentation', app, document);

    app.useGlobalPipes(new ValidationPipe({transform: true}));
    app.enableCors();

    await app.listen(PORT, () => console.log(`the server has started on ${PORT}`));
}

start();