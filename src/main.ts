import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global de DTOs com regras mais rigorosas
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Porcentagem API Belvo')
    .setDescription('API para integração com a Belvo')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Configuração da porta
  const port = process.env.PORT || 3003;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(
    `Swagger documentation is available at: ${await app.getUrl()}/docs`,
  );
}
// Executa o bootstrap com tratamento de erros
bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});
