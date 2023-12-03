// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-cycle */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Installment } from './installment';

@Entity('Credits')
export class Credit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column()
  amount: number;

  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: 'updated_at' })
  updatedAt: Date;

  // eslint-disable-next-line arrow-body-style
  @ManyToOne(() => User, (user) => user.credits)
  user: User;

  // eslint-disable-next-line arrow-body-style
  @OneToMany(() => Installment, (installment) => installment.credit)
  installments: Installment[];
}
