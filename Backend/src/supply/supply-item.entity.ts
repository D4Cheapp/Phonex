import { Product } from 'src/product/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Supply } from './supply.entity';

@Entity()
export class SupplyItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Supply, (supply) => supply.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'supply_id' })
  supply: Supply;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
