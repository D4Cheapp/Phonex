import { Product } from 'src/products/product.entity';
import { Shop } from 'src/shop/shop.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductSupplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  isPrimary: boolean;

  @ManyToOne(() => Shop, (shop) => shop.id, { onDelete: 'CASCADE' })
  shop: Shop;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Supplier, (supplier) => supplier.id, { onDelete: 'CASCADE' })
  supplier: Supplier;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
