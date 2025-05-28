import { Role } from 'src/role/role.entity';
import { Shop } from 'src/shop/shop.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  @ManyToOne(() => Shop, (shop) => shop.id)
  shop: Shop;
}
