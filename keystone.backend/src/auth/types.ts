/**
 * Clerk JWT payload interface
 * 
 * This interface defines the structure of the user payload
 * that comes from Clerk JWT tokens after verification.
 */
export interface ClerkUserPayload {
  sub: string; // User ID
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  imageUrl?: string;
  iat: number; // Issued at
  exp: number; // Expires at
  iss: string; // Issuer
  aud?: string; // Audience
  azp?: string; // Authorized party
  [key: string]: any; // Allow additional properties
}
