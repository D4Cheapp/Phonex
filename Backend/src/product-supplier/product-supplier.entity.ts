import { Product } from 'src/products/product.entity';
import { Shop } from 'src/shop/shop.entity';
import { Supplier } from 'src/supplier/supplier.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSupplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  isPrimary: boolean;

  @ManyToOne(() => Shop, (shop) => shop.id)
  shop: Shop;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => Supplier, (supplier) => supplier.id)
  supplier: Supplier;
}
