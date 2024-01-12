import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let fakeItemsService: Partial<ItemsService>;

  beforeEach(async () => {
    fakeItemsService = {}
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ItemsService,
        useValue: fakeItemsService
      }],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
