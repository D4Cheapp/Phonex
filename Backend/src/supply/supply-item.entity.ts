import { Product } from 'src/products/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Supply } from './supply.entity';

@Entity()
export class SupplyItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Supply, (supply) => supply.id)
  supply: Supply;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;
}
