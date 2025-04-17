// src/products/products.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  const mockProductRepo = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(product =>
      Promise.resolve({ id: 1, ...product }),
    ),
    find: jest.fn().mockResolvedValue([{ id: 1, name: 'TV', price: 500 }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepo,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('debe crear un producto correctamente', async () => {
    const dto = { name: 'TV', price: 500 };
    const result = await service.create(dto);
    expect(result).toEqual({ id: 1, name: 'TV', price: 500 });
    expect(repo.save).toHaveBeenCalled();
  });

  it('debe listar los productos', async () => {
    const products = await service.findAll();
    expect(products).toHaveLength(1);
  });
});
