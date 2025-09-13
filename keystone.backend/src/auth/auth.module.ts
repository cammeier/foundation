import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClerkAuthGuard } from './clerk-auth.guard';
import { ClerkAuthMiddleware } from './auth.middleware';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, ClerkAuthGuard, ClerkAuthMiddleware],
  exports: [AuthService, ClerkAuthGuard, ClerkAuthMiddleware]
})
export class AuthModule {}
