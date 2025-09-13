// Auth module exports for clean imports
export { AuthModule } from './auth.module';
export { AuthService } from './auth.service';
export { AuthController } from './auth.controller';
export { ClerkAuthGuard } from './clerk-auth.guard';
export { ClerkAuthMiddleware } from './auth.middleware';
export { User } from './user.decorator';

// Export types
export type { ClerkUserPayload } from './types';
