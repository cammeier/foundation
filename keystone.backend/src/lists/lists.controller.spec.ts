import { Test, TestingModule } from '@nestjs/testing';
import { ListsController } from './lists.controller';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';

describe('ListsController', () => {
  let controller: ListsController;
  let mockRequest: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListsController],
    })
      .overrideGuard(ClerkAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ListsController>(ListsController);

    // Mock request object with user data
    mockRequest = {
      user: {
        sub: 'user_123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe'
      },
      params: {
        id: '1'
      }
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return lists for authenticated user', () => {
    const result = controller.getLists(mockRequest);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.user.id).toBe('user_123');
    expect(result.user.email).toBe('test@example.com');
  });

  it('should return a specific list by ID', () => {
    const result = controller.getList(mockRequest);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.id).toBe('1');
    expect(result.user.id).toBe('user_123');
  });
});
