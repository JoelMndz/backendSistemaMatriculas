import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )
  app.setGlobalPrefix('api');
  app.use(bodyParser.json({limit:'10mb'}))
  setupSwagger(app)
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
