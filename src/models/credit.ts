// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-cycle */
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user';
import { Installment } from './installment';

@Entity('Credits')
export class Credit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'installment_count' })
  installmentCount: number;

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

  // eslint-disable-next-line arrow-body-style
  @ManyToOne(() => User, (user) => user.credits, { nullable: false })
  user: User;

  // eslint-disable-next-line arrow-body-style
  @OneToMany(() => Installment, (installment) => installment.credit)
  installments: Installment[];
}
