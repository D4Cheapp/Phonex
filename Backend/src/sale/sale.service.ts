import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { WarehouseProductService } from 'src/warehouse-product/warehouse-product.service';
import { DataSource } from 'typeorm';

import { SaleItem } from './sale-item.entity';
import { SaleDto } from './sale.dto';
import { Sale } from './sale.entity';

@Injectable()
export class SaleService {
  constructor(
    private dataSource: DataSource,
    private warehouseProductService: WarehouseProductService
  ) {}

  async getShopSales(shopId: number) {
    return await this.dataSource
      .getRepository(Sale)
      .find({ where: { shop: { id: shopId } } })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async createSale(saleData: SaleDto) {
    const sale = await this.dataSource
      .getRepository(Sale)
      .save({
        shop: { id: saleData.shopId },
        user: { id: saleData.userId },
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    const saleItems = await Promise.all(
      saleData.saleItems.map(
        async (saleItem) =>
          await this.dataSource.getRepository(SaleItem).save({
            sale: { id: sale.id },
            product: { id: saleItem.productId },
            quantity: saleItem.quantity,
          })
      )
    );

    await this.warehouseProductService
      .updateWarehouseProducts(saleData.shopId, saleItems)
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    return { sale, saleItems };
  }
}
