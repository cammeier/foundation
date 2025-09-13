import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8080'], // Add your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log('🚀 Server is running and waiting for requests...');
  console.log(`📡 API available at: http://localhost:${port}`);
  console.log(`📋 Lists endpoint: http://localhost:${port}/lists`);
  console.log(`🔐 Authentication: Clerk JWT tokens required`);
  console.log('---');
}
bootstrap();
