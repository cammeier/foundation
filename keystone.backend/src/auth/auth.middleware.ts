import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@clerk/clerk-sdk-node';
import { ClerkUserPayload } from './types';

/**
 * Clerk Authentication Middleware for NestJS
 *
 * This middleware verifies Clerk JWT tokens and attaches user information
 * to the Express request object.
 *
 * Environment Variables Required:
 * - CLERK_SECRET_KEY: Your Clerk secret key
 * - CLERK_ISSUER: (Optional) JWT issuer, defaults to 'https://clerk.dev'
 *
 * Usage:
 * 1. Apply globally in main.ts:
 *    app.use(new ClerkAuthMiddleware().use);
 *
 * 2. Apply to specific routes/modules:
 *    consumer.apply(ClerkAuthMiddleware).forRoutes('*');
 *
 * 3. Access user in controllers:
 *    const userId = req.user?.sub;
 *    const email = req.user?.email;
 *
 * Example Controller Usage:
 * ```typescript
 * @Controller('protected')
 * export class ProtectedController {
 *   @Get('profile')
 *   getProfile(@User() user: ClerkUserPayload) {
 *     return {
 *       userId: user.sub,
 *       email: user.email,
 *       firstName: user.firstName
 *     };
 *   }
 * }
 * ```
 */

// Extend Express Request interface to include user property
declare module 'express' {
  interface Request {
    user?: ClerkUserPayload;
  }
}

@Injectable()
export class ClerkAuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      console.log('🔍 Auth header:', authHeader ? `${authHeader.substring(0, 20)}...` : 'No auth header');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('❌ No valid Bearer token found');
        return next();
      }

      const token = authHeader.replace('Bearer ', '');
      console.log('🔑 Token extracted:', token ? `${token.substring(0, 20)}...` : 'No token');

      if (!token) {
        console.log('❌ Empty token after Bearer removal');
        return next();
      }

      const secretKey = this.configService.get<string>('CLERK_SECRET_KEY');
      const issuer = this.configService.get<string>('CLERK_ISSUER') || 'https://clerk.dev';
      
      console.log('🔧 Config - Secret key:', secretKey ? `${secretKey.substring(0, 10)}...` : 'No secret key');
      console.log('🔧 Config - Issuer:', issuer);

      // Verify the Clerk JWT token
      const payload = await verifyToken(token, {
        secretKey: secretKey!,
        issuer: issuer,
      });

      console.log('✅ Token verified successfully for user:', payload.sub);
      // Attach the verified user payload to the request
      req.user = payload as unknown as ClerkUserPayload;

    } catch (error) {
      // Log the error for debugging but don't expose sensitive information
      console.error('❌ Clerk token verification failed:', error.message);
      console.error('❌ Full error:', error);

      // Clear any potentially corrupted user data
      req.user = undefined;
    }

    next();
  }
}