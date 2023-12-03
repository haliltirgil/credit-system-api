import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Credit } from './credit';

@Entity('Installments')
export class Installment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  status: number;

  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: 'updated_at' })
  updatedAt: Date;

  // eslint-disable-next-line arrow-body-style, prettier/prettier
  @ManyToOne(() => Credit, (credit) => credit.installments)
  credit: Credit;
}
