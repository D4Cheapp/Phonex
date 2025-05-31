import { Shop } from 'src/shop/shop.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SupplyStatus } from './supply-status.entity';

@Entity()
export class Supply {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.id, { onDelete: 'CASCADE' })
  supplier: Supplier;

  @ManyToOne(() => Shop, (shop) => shop.id, { onDelete: 'CASCADE' })
  shop: Shop;

  @ManyToOne(() => SupplyStatus, (supplyStatus) => supplyStatus.id, { onDelete: 'CASCADE' })
  supplyStatus: SupplyStatus;
}
