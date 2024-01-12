import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;
  let fakeItemsService: Partial<ItemsService>

  beforeEach(async () => {
    fakeItemsService = {}
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ItemsService,
        useValue: fakeItemsService,
      }],
      controllers: [ItemsController],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
