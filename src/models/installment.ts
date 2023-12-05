import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Credit } from './credit';

@Entity('Installments')
export class Installment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  status: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'remaining_amount' })
  remainingTotalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, name: 'total_interest' })
  totalInterest: number;

  @Column({ type: 'timestamptz' })
  dueDate: Date;

  @Column({
    type: 'timestamptz',
    default: () => {
      return 'CURRENT_TIMESTAMP';
    },
  })
  createdAt: Date;

  @Column({
    type: 'timestamptz',
    default: () => {
      return 'CURRENT_TIMESTAMP';
    },
  })
  updatedAt: Date;

  // eslint-disable-next-line arrow-body-style, prettier/prettier
  @ManyToOne(() => Credit, (credit) => credit.installments, { nullable: false })
  credit: Credit;
}
