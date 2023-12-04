import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { MAX_LENGTH, MIN_LENGTH } from '../constants/const-variables';
// eslint-disable-next-line import/no-cycle
import { Credit } from './credit';

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(MIN_LENGTH)
  @MaxLength(MAX_LENGTH)
  @Column({ nullable: false, name: 'first_name' })
  firstName: string;

  @MinLength(MIN_LENGTH)
  @MaxLength(MAX_LENGTH)
  @Column({ nullable: false, name: 'last_name' })
  lastName: string;

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
  @OneToMany(() => Credit, (credit) => credit.user)
  credits: Credit[];
}
