import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ClerkUserPayload } from './types';

/**
 * Custom decorator to extract the authenticated user from the request
 * 
 * This decorator provides a clean way to access the authenticated user
 * in your controllers without having to manually extract it from the request.
 * 
 * Usage:
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
 *   
 *   @Get('email')
 *   getEmail(@User('email') email: string) {
 *     return { email };
 *   }
 * }
 * ```
 */
export const User = createParamDecorator(
  (data: keyof ClerkUserPayload | undefined, ctx: ExecutionContext): ClerkUserPayload | any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
