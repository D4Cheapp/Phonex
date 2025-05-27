import { Roles } from 'src/constants/roles';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, enum: Roles })
  name: string;
}
