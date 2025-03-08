import { Roles } from 'src/constants/roles';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ enum: Roles, default: 'USER' })
  role: Roles;
}
