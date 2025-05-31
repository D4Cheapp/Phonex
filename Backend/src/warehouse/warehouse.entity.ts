import { Product } from 'src/products/product.entity';
import { Shop } from 'src/shop/shop.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToMany(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  products: Product[];

  @ManyToOne(() => Shop, (shop) => shop.id, { onDelete: 'CASCADE' })
  shop: Shop;
}
