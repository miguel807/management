import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const options = new DocumentBuilder()
  .setTitle('API')
  .setDescription('Documentación de la API para manejar clientes')
  .setVersion('1.0')
  .addTag('')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
