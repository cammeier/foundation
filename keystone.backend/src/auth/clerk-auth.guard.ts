import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';

/**
 * Clerk Authentication Guard for NestJS
 * 
 * This guard validates that a user is authenticated via Clerk JWT tokens.
 * It works in conjunction with the ClerkAuthMiddleware which handles token verification.
 * 
 * The guard ensures that:
 * - A user object exists on the request (set by ClerkAuthMiddleware)
 * - The user has a valid 'sub' (subject/user ID) property
 * 
 * Usage:
 * ```typescript
 * @Controller('protected')
 * export class ProtectedController {
 *   @UseGuards(ClerkAuthGuard)
 *   @Get('profile')
 *   getProfile(@User() user: ClerkUserPayload) {
 *     return {
 *       userId: user.sub,
 *       email: user.email
 *     };
 *   }
 * }
 * ```
 * 
 * Or apply globally in your module:
 * ```typescript
 * @Module({
 *   providers: [
 *     {
 *       provide: APP_GUARD,
 *       useClass: ClerkAuthGuard,
 *     },
 *   ],
 * })
 * ```
 */
@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger(ClerkAuthGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    
    // Check if user exists on request (set by ClerkAuthMiddleware)
    if (!request.user) {
      this.logger.warn('Authentication required - no user found on request');
      throw new UnauthorizedException('Authentication required');
    }
    
    // Validate that user has required properties
    if (!request.user.sub) {
      this.logger.warn('Invalid user object - missing subject (sub) property');
      throw new UnauthorizedException('Invalid authentication token');
    }
    
    this.logger.debug(`User authenticated: ${request.user.sub}`);
    return true;
  }
}
