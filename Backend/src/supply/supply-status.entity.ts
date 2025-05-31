import { SupplyStatusE } from 'src/constants/supply-status';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupplyStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, enum: SupplyStatusE })
  name: string;
}
