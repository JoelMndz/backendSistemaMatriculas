import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app:any)=>{
  const config = new DocumentBuilder()
    .setTitle('API Sistema Escolar')
    .setDescription('API REST')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}