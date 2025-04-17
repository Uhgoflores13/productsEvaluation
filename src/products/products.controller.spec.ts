import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockService = {
    create: jest.fn(dto => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [{ id: 1, name: 'TV', price: 500 }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('debe crear un producto', async () => {
    const dto = { name: 'TV', price: 500 };
    expect(await controller.create(dto)).toEqual({ id: 1, ...dto });
  });

  it('debe listar productos', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1, name: 'TV', price: 500 }]);
  });
});
