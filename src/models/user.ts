import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { MAX_LENGTH, MIN_LENGTH } from '../constants/const-variables';
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

  @CreateDateColumn()
  @Column({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({ name: 'updated_at' })
  updatedAt: Date;

  // eslint-disable-next-line arrow-body-style
  @OneToMany(() => Credit, (credit) => credit.user)
  credits: Credit[];
}
