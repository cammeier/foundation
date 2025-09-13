import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard, User } from '../auth';
import type { ClerkUserPayload } from '../auth';
import { ListsService } from './lists.service';
import { List } from './entities/list.entity';
import { ListItem } from './entities/list-item.entity';

/**
 * Lists Controller
 * 
 * Provides endpoints for managing lists with Clerk authentication.
 */
@Controller('lists')
@UseGuards(ClerkAuthGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}
  
  /**
   * Get all lists for the authenticated user
   * 
   * @param user - Authenticated user from Clerk JWT token
   * @returns Array of lists belonging to the user
   */
  @Get()
  async getLists(@User() user: ClerkUserPayload) {
    try {
      const lists = await this.listsService.findAllByUserId(user.sub);
      
      return {
        success: true,
        data: lists,
        message: `Found ${lists.length} lists for user ${user.sub}`,
        user: {
          id: user.sub,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Error retrieving lists',
        error: error.message
      };
    }
  }

  /**
   * Get a specific list by ID
   * 
   * @param user - Authenticated user from Clerk JWT token
   * @param id - List ID
   * @returns Single list object
   */
  @Get(':id')
  async getList(@User() user: ClerkUserPayload, @Param('id') id: string) {
    try {
      const list = await this.listsService.findOneById(id, user.sub);
      
      if (!list) {
        return {
          success: false,
          data: null,
          message: `List with ID ${id} not found or access denied`,
        };
      }

      return {
        success: true,
        data: list,
        message: `Retrieved list ${id} for user ${user.sub}`,
        user: {
          id: user.sub,
          email: user.email
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error retrieving list',
        error: error.message
      };
    }
  }

  /**
   * Create a new list
   * 
   * @param user - Authenticated user from Clerk JWT token
   * @param createListDto - List creation data
   * @returns Created list object
   */
  @Post()
  async createList(@User() user: ClerkUserPayload, @Body() createListDto: { name: string; description?: string }) {
    try {
      const list = await this.listsService.create({
        ...createListDto,
        userId: user.sub,
      });

      return {
        success: true,
        data: list,
        message: 'List created successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error creating list',
        error: error.message
      };
    }
  }

  /**
   * Update a list
   * 
   * @param user - Authenticated user from Clerk JWT token
   * @param id - List ID
   * @param updateListDto - List update data
   * @returns Updated list object
   */
  @Put(':id')
  async updateList(@User() user: ClerkUserPayload, @Param('id') id: string, @Body() updateListDto: { name?: string; description?: string }) {
    try {
      const list = await this.listsService.update(id, user.sub, updateListDto);
      
      if (!list) {
        return {
          success: false,
          data: null,
          message: `List with ID ${id} not found or access denied`,
        };
      }

      return {
        success: true,
        data: list,
        message: 'List updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error updating list',
        error: error.message
      };
    }
  }

  /**
   * Delete a list
   * 
   * @param user - Authenticated user from Clerk JWT token
   * @param id - List ID
   * @returns Deletion result
   */
  @Delete(':id')
  async deleteList(@User() user: ClerkUserPayload, @Param('id') id: string) {
    try {
      const deleted = await this.listsService.remove(id, user.sub);
      
      if (!deleted) {
        return {
          success: false,
          message: `List with ID ${id} not found or access denied`,
        };
      }

      return {
        success: true,
        message: 'List deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error deleting list',
        error: error.message
      };
    }
  }

  /**
   * Add an item to a list
   * 
   * @param user - Authenticated user from Clerk JWT token
   * @param id - List ID
   * @param createItemDto - Item creation data
   * @returns Created item object
   */
  @Post(':id/items')
  async addItemToList(@User() user: ClerkUserPayload, @Param('id') id: string, @Body() createItemDto: { name: string }) {
    try {
      const item = await this.listsService.addItemToList(id, user.sub, createItemDto);
      
      if (!item) {
        return {
          success: false,
          data: null,
          message: `List with ID ${id} not found or access denied`,
        };
      }

      return {
        success: true,
        data: item,
        message: 'Item added to list successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error adding item to list',
        error: error.message
      };
    }
  }

  /**
   * Update a list item
   * 
   * @param user - Authenticated user from Clerk JWT token
   * @param itemId - Item ID
   * @param updateItemDto - Item update data
   * @returns Updated item object
   */
  @Put('items/:itemId')
  async updateItem(@User() user: ClerkUserPayload, @Param('itemId') itemId: string, @Body() updateItemDto: { name?: string; completed?: boolean }) {
    try {
      const item = await this.listsService.updateItem(itemId, user.sub, updateItemDto);
      
      if (!item) {
        return {
          success: false,
          data: null,
          message: `Item with ID ${itemId} not found or access denied`,
        };
      }

      return {
        success: true,
        data: item,
        message: 'Item updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Error updating item',
        error: error.message
      };
    }
  }

  /**
   * Delete a list item
   * 
   * @param user - Authenticated user from Clerk JWT token
   * @param itemId - Item ID
   * @returns Deletion result
   */
  @Delete('items/:itemId')
  async deleteItem(@User() user: ClerkUserPayload, @Param('itemId') itemId: string) {
    try {
      const deleted = await this.listsService.removeItem(itemId, user.sub);
      
      if (!deleted) {
        return {
          success: false,
          message: `Item with ID ${itemId} not found or access denied`,
        };
      }

      return {
        success: true,
        message: 'Item deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error deleting item',
        error: error.message
      };
    }
  }
}
