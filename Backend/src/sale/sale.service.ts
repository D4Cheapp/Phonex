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
      .find({ where: { shop: { id: shopId } }, relations: ['user', 'shop'] })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async createSale(saleData: SaleDto) {
    const sale = await this.dataSource
      .getRepository(Sale)
      .save({
        shop: { id: saleData.shop_id },
        user: { id: saleData.user_id },
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    const saleItems = await Promise.all(
      saleData.sale_items.map(
        async (saleItem) =>
          await this.dataSource.getRepository(SaleItem).save({
            sale: { id: sale.id },
            product: { id: saleItem.product_id },
            quantity: saleItem.quantity,
          })
      )
    );

    await this.warehouseProductService
      .updateWarehouseProducts(saleData.shop_id, saleItems)
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });

    return { sale, saleItems };
  }
}
