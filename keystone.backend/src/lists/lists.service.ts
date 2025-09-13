import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { ListItem } from './entities/list-item.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
    @InjectRepository(ListItem)
    private listItemsRepository: Repository<ListItem>,
  ) {}

  async findAllByUserId(userId: string): Promise<List[]> {
    return this.listsRepository.find({
      where: { userId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneById(id: string, userId: string): Promise<List | null> {
    return this.listsRepository.findOne({
      where: { id, userId },
      relations: ['items'],
    });
  }

  async create(listData: Partial<List>): Promise<List> {
    const list = this.listsRepository.create(listData);
    return this.listsRepository.save(list);
  }

  async update(id: string, userId: string, updateData: Partial<List>): Promise<List | null> {
    await this.listsRepository.update({ id, userId }, updateData);
    return this.findOneById(id, userId);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const result = await this.listsRepository.delete({ id, userId });
    return (result.affected ?? 0) > 0;
  }

  async addItemToList(listId: string, userId: string, itemData: Partial<ListItem>): Promise<ListItem | null> {
    // Verify the list belongs to the user
    const list = await this.findOneById(listId, userId);
    if (!list) {
      return null;
    }

    const item = this.listItemsRepository.create({
      ...itemData,
      listId,
    });
    return this.listItemsRepository.save(item);
  }

  async updateItem(itemId: string, userId: string, updateData: Partial<ListItem>): Promise<ListItem | null> {
    // Find the item and verify it belongs to the user's list
    const item = await this.listItemsRepository.findOne({
      where: { id: itemId },
      relations: ['list'],
    });

    if (!item || item.list.userId !== userId) {
      return null;
    }

    await this.listItemsRepository.update(itemId, updateData);
    return this.listItemsRepository.findOne({ where: { id: itemId } });
  }

  async removeItem(itemId: string, userId: string): Promise<boolean> {
    // Find the item and verify it belongs to the user's list
    const item = await this.listItemsRepository.findOne({
      where: { id: itemId },
      relations: ['list'],
    });

    if (!item || item.list.userId !== userId) {
      return false;
    }

    const result = await this.listItemsRepository.delete(itemId);
    return (result.affected ?? 0) > 0;
  }
}
