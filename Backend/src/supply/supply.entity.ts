import { Shop } from 'src/shop/shop.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
